import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Utils } from 'src/helpers/utils';
import { ApiResponse } from 'src/helpers/response';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {
  }

  async create(createUserDto: CreateUserDto) {
    // check name exist
    const isNameExist = await this.checkIfNameExists(createUserDto.name);
    if(isNameExist)
    {
      return ApiResponse.error('Name already exist!', 405);
    }

    // check email exist
    const IsEmailExist = await this.checkIfEmailExists(createUserDto.email);
    if(IsEmailExist)
    {
      return ApiResponse.error('Email already exist!', 406);
    }

    const password = Utils.generateRandomPassword();
    console.log(password);

    const passwordHash = await Utils.hashPassword(password);
    console.log(passwordHash);

    await this.emailService.sendEmail(createUserDto.email,'Password',password);

    const user = await this.usersRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash:passwordHash
    })

    try{
      this.usersRepository.save(user);
    }catch(error)
    {
      console.log(error)
    }
    

    return ApiResponse.success(null,'User create success!')
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
