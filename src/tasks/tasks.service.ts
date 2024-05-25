import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}
  taskList = [
    {
      task: 'task1',
      createdAt: new Date(),
      image: 'some photo',
    },
  ];
  async create(createTaskDto: CreateTaskDto) {
    const { task, image, status } = createTaskDto;

    if (!task || !image || status === undefined || null)
      throw new BadRequestException('Data is not Valid');

    const newTask = this.taskRepo.create(createTaskDto);
    await this.taskRepo.save(newTask);

    return {
      message: 'success',
      data: newTask,
    };
  }

  async findAll() {
    // TODO :- check user is logged in or not,
    // TODO :- check user is valid or not
    // TODO :- show user specific data,

    const tasks = await this.taskRepo.find({
      relations:['userId']
    });

    return {
      message: 'success',
      data: tasks,
    };
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
