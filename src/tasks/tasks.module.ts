import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Otp, OtpSchema } from 'src/auth/schema/otp.shema';
import { User } from 'src/user/entities/user.entity';
import { Task } from './entities/task.entity';
import { TaskLog, TaskLogSchema } from './schema/tasks-logs.schema';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User]),
    MongooseModule.forFeature([
      { name: TaskLog.name, schema: TaskLogSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
    MulterModule.register({
      dest: './uploads', 
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, AuthService],
})
export class TasksModule {}
