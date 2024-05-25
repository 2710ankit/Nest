import { Task } from 'src/tasks/entities/task.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'username', nullable: false, type: 'varchar', unique: true })
  username: string;

  @Column({ name: 'password', nullable: false, type: 'varchar' })
  password: string;

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

  @OneToMany(() => Task, (task) => task.userId)
  task: Task;

  // @BeforeInsert()
  // private setCreateDate(): void {
  //   console.log('before insert')
  //   // this.createdAt = new Date();
  // }

  // @BeforeUpdate()
  // public setUpdateDate(): void {
  //   this.updatedAt = new Date();
  // }
}
