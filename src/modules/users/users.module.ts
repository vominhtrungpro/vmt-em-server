import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreditCard } from 'src/modules/credit_cards/entities/credit_card.entity';
import { EmailModule } from '../email/email.module';


@Module({
  imports: [TypeOrmModule.forFeature([User, CreditCard]),EmailModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
