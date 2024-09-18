import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Utils } from 'src/helpers/utils';
import { ApiResponse } from 'src/helpers/response';
import { EmailService } from '../email/email.service';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isNameExist = await this.checkIfNameExists(createUserDto.name);
    if (isNameExist) {
      return ApiResponse.error('Name already exist!', 405);
    }

    const IsEmailExist = await this.checkIfEmailExists(createUserDto.email);
    if (IsEmailExist) {
      return ApiResponse.error('Email already exist!', 406);
    }

    const password = Utils.generateRandomPassword();

    const passwordHash = await Utils.hashPassword(password);

    await this.emailService.sendEmail(
      createUserDto.email,
      'Password',
      password,
    );

    const user = await this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash: passwordHash,
    });

    this.usersRepository.save(user);

    return ApiResponse.success(null, 'User create success!');
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query);
    if (filter.current) delete filter.current;
    if(filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.usersRepository.find({where: filter})).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * (pageSize);

    const users = await this.usersRepository.find({
      where: filter,
      take: pageSize,
      skip: skip,
      order: sort,
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt']
    });

    const result = {
      users,
      totalPages,
    };
    
    return ApiResponse.success(result, 'List user success!');
  }

  async findOne(id: number) {
    const result = await this.usersRepository.findOne({ where: { id } });
    if (!result) {
      return ApiResponse.error('User not found!', 407);
    }
    return ApiResponse.success(result, 'List user success!');
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.usersRepository.update(id, updateUserDto);
    if (!result.affected) {
      return ApiResponse.error('User not found!', 407);
    }

    return ApiResponse.success(null, 'User update success!');
  }

  async remove(id: number) {
    const result = await this.usersRepository.delete(id);
    if (!result.affected) {
      return ApiResponse.error('User not found!', 407);
    }

    return ApiResponse.success(null, 'User delete success!');
  }

  async checkIfEmailExists(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return !!user;
  }

  async checkIfNameExists(name: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { name } });
    return !!user;
  }
}
