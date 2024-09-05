import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from 'src/modules/categories/entities/category.entity';
import { CreditCard } from 'src/modules/credit_cards/entities/credit_card.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CreditCard, creditCard => creditCard.transactions)
  card: CreditCard;

  @Column()
  transactionType: string;

  @Column('decimal')
  amount: number;

  @ManyToOne(() => Category)
  category: Category;

  @Column()
  date: Date;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => CreditCard, { nullable: true })
  sourceCard: CreditCard;

  @ManyToOne(() => CreditCard, { nullable: true })
  destinationCard: CreditCard;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
