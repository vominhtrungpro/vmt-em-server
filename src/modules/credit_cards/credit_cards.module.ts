import { Module } from '@nestjs/common';
import { CreditCardsService } from './credit_cards.service';
import { CreditCardsController } from './credit_cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCard } from './entities/credit_card.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCard,User,Transaction])],
  controllers: [CreditCardsController],
  providers: [CreditCardsService],
})
export class CreditCardsModule {}
