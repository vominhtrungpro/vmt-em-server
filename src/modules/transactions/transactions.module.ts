import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { CreditCard } from 'src/modules/credit_cards/entities/credit_card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction,Category,CreditCard])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
