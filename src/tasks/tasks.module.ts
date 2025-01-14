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
import { RedisModule } from 'src/redis/redis.module';
import { Category } from './entities/category.entity';
import { Comment } from './entities/comment.entity';
import { Post } from './entities/posts.entity';
import { Tag } from './entities/tags.entity';
import { Users } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User, Category, Comment, Post, Tag, Users]),
    MongooseModule.forFeature([
      { name: TaskLog.name, schema: TaskLogSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
    RedisModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, AuthService],
})
export class TasksModule {}
