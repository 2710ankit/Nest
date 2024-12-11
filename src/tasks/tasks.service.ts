import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { TaskLog } from './schema/tasks-logs.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,

    @InjectModel(TaskLog.name)
    private taskLogsModel: Model<TaskLog>,

    private jwtService: JwtService,
    private authService: AuthService,
  ) {}
  taskList = [
    {
      task: 'task1',
      createdAt: new Date(),
      image: 'some photo',
    },
  ];
  async create(createTaskDto: CreateTaskDto, req: Request) {
    const { task, image, status } = createTaskDto;

    if (!task || !image || status === undefined || null)
      throw new BadRequestException('Data is not Valid');

    const { userId } = this.jwtService.decode(req.header('Authorization'));
    try {
      const newTask = this.taskRepo.create({ ...createTaskDto, user: userId });
      await this.taskRepo.save(newTask);

      const logger = new Logger('SQL');

      logger.error("SOME ERROR")

      const createTaskLog = new this.taskLogsModel({
        query: 'some query',
        taskId: newTask.id,
      });

      await createTaskLog.save();

      return {
        message: 'success',
        data: newTask,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  } 
  async findAll(req: Request) {
    const { userId } = this.jwtService.decode(req.header('Authorization'));
    console.log(req.header("Authorization"), userId)
    try {
      let searchQuery = {};
      const user = await this.authService.findOne(userId); 
      if (user.roles.includes('user')) { 
        searchQuery = {
          user: {
            id: userId,
          },
        };
      }
      const tasks = await this.taskRepo.find({
        where: {
          ...searchQuery,
        },
        relations: ['user'],
      });
      return {
        message: 'success',
        data: tasks,
      };
    } catch (error) {
      console.log(error);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  async remove(req: Request, taskId: string) {
    const { userId } = this.jwtService.decode(req.header('Authorization'));
    if(!userId){
      throw new Error("Not Authorized")
    }
    try {
      let searchQuery = {};
      const user = await this.authService.findOne(userId); 
      if (user.roles.includes('user')) { 
        searchQuery = {
          user: {
            id: userId,
          },
        };
      }  
      const tasks = await this.taskRepo.update(taskId,{
        task:"after update"
      });
      return {
        message: 'success',
        data: [],
      };
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFile(file:Express.Multer.File){
    return {
      originalname: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
    };
  }
}
