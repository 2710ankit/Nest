import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum OrderState {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAIL = 'fail',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @Column({ name: 'order_id', nullable: false, unique: true })
  order_id: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: OrderState,
    default: OrderState.PENDING,
  })
  status: OrderState = OrderState.PENDING;

  @ManyToOne(() => User, (user) => user.task, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;
}
