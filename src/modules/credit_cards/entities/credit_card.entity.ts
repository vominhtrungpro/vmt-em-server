import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';

@Entity('credit_cards')
export class CreditCard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.creditCards)
  user: User;

  @Column()
  cardName: string;

  @Column()
  cardNumber: string;

  @Column('decimal')
  balance: number;

  @OneToMany(() => Transaction, transaction => transaction.card)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
