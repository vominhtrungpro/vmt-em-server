import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/modules/users/users.service';
import { Utils } from 'src/helpers/utils';
import { ApiResponse } from 'src/helpers/response';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService 
  ) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async signIn(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return ApiResponse.error('User not found!', 407);
    }

    if (!(await Utils.comparePassword(password,user.passwordHash))) {
      return ApiResponse.error('Wrong password!', 401);
    }

    const payload = { sub: user.id, name: user.name, email: user.email };

    const result = {
      access_token: await this.jwtService.signAsync(payload),
    }

    return ApiResponse.success(result, 'List user success!');
  }
}
