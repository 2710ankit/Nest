import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  taskList = [
    {
      task: 'task1',
      createdAt: new Date(),
      image: 'some photo',
    },
  ];
  create(createTaskDto: CreateTaskDto) {
    const { task, image } = createTaskDto;

    if (!task || !image) throw new BadRequestException('Data is not Valid');

    this.taskList.push({
      task,
      createdAt: new Date(),
      image,
    });
    return {
      message: 'success',
      data: this.taskList,
    };
  }

  findAll() {
    return {
      message: 'success',
      data: this.taskList,
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
