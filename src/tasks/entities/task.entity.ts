import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'task', nullable: false })
  task: string;

  @Column({ name: 'status', nullable: false })
  status: boolean;

  @Column({ name: 'image', nullable: false })
  image: string;

  @ManyToOne(() => User, (user) => user.task, {})
  @JoinColumn({ name: 'userId' })
  userId: User;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  updatedAt: Date;
}
