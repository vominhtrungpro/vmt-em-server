import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreditCard } from 'src/modules/credit_cards/entities/credit_card.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, CreditCard])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
