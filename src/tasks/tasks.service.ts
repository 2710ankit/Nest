import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,

    private jwtService: JwtService,
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

    const { userId } = this.jwtService.decode(req.cookies.token);

    const newTask = this.taskRepo.create({ ...createTaskDto, user: userId });
    await this.taskRepo.save(newTask);

    return {
      message: 'success',
      data: newTask,
    };
  }

  async findAll(req: Request) {
    const { userId } = this.jwtService.decode(req.cookies.token);

    try {
      const tasks = await this.taskRepo.find({
        where: {
          user: {
            id: userId,
          },
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

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
