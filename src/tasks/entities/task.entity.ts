import { User } from 'src/user/entities/user.entity';
import {
  AfterUpdate,
  BeforeInsert,
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

  @ManyToOne(() => User, (user) => user.task, {onDelete:'CASCADE'})
  @JoinColumn({ name: 'userId', })
  user: User;

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


  @AfterUpdate()
    setCreateDate(): void {
      console.log(1111111111111)
    this.task = "after update trigger"

    
    // this.createdAt = new Date();s
  }
}
