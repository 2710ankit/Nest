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
import { RedisService } from 'src/redis/redis.service';
import { Category } from './entities/category.entity';
import { Comment } from './entities/comment.entity';
import { Post } from './entities/posts.entity';
import { Tag } from './entities/tags.entity';
import { Users } from './entities/users.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,

    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,

    @InjectRepository(Post)
    private postRepo: Repository<Post>,

    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,

    @InjectRepository(Users)
    private userRepo: Repository<Users>,

    @InjectModel(TaskLog.name)
    private taskLogsModel: Model<TaskLog>,

    private jwtService: JwtService,
    private authService: AuthService,
    private readonly redisService: RedisService,
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

    // if (!task || !image || status === undefined || null)
    //   throw new BadRequestException('Data is not Valid');

    const { userId }: any = await this.redisService.getCache(
      req.header('Authorization'),
    );
    try {

      console.log("here")
      let bulkTasks = [];
      // for (let index = 0; index < 10; index++) {
      // bulkTasks = []
      // for (let i = 0; i < 500000; i++) {
      //   createTaskDto.task = `${task}-${Math.random()}`;
      //   bulkTasks.push(createTaskDto);
      // }
      // await this.taskRepo.insert(bulkTasks);
      // }

      // const newTask = this.taskRepo.create({
      //   ...createTaskDto,
      //   user: userId,
      // });
      // await this.taskRepo.save(newTask);

      // const logger = new Logger('SQL');

      // logger.error('SOME ERROR');

      // const createTaskLog = new this.taskLogsModel({
      //   query: 'some query',
      //   taskId: newTask.id,
      // });

      // await createTaskLog.save();



      await this._createDummyData()

      return {
        message: 'success',
        // data: newTask,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
  async findAll(req: Request) {
    const { userId }: any = await this.redisService.getCache(
      req.header('Authorization'),
    );
    try {
      let searchQuery = {};
      const user = await this.authService.findOne(userId);
      console.log(user);
      if (user.roles.includes('admin')) {
        searchQuery = {
          user: {
            // id: userId,
          },
          task: 'taskMade',
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
    if (!userId) {
      throw new Error('Not Authorized');
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
      const tasks = await this.taskRepo.update(taskId, {
        task: 'after update',
      });
      return {
        message: 'success',
        data: [],
      };
    } catch (error) {
      console.log(error);
    }
  }

  async uploadFile(file: Express.Multer.File) {
    return {
      originalname: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  async _createDummyData() {
    const users = Array.from({ length: 10000 }, (_, i) => {
      const user = new Users();
      user.name = `User ${i + 1}`;
      user.email = `user${i + 1}@example.com`;
      return user;
    });
  
    console.time("user")
    await this.userRepo.save(users);
    console.timeEnd("user")
    
    const categories = ['Technology', 'Health', 'Education', 'Sports'].map(
      (name) => {
        const category = new Category();
        category.name = name;
        return category;
      },
    );
  
    console.time("categories")
    await this.categoryRepo.save(categories);
    console.timeEnd("categories")
    const tags = ['News', 'Updates', 'Trends', 'Tips', 'Guides'].map((name) => {
      const tag = new Tag();
      tag.name = name;
      return tag;
    });
  
    console.time("tags")
    await this.tagRepo.save(tags);
    console.timeEnd("tags")
    const posts = Array.from({ length: 50000 }, (_, i) => {
      const post = new Post();
      post.title = `Post Title ${i + 1}`;
      post.content = `This is the content for post ${i + 1}`;
      post.user = users[Math.floor(Math.random() * users.length)];
      post.category = categories[Math.floor(Math.random() * categories.length)];
  
      const shuffledTags = tags.sort(() => 0.5 - Math.random());
      post.tags = shuffledTags.slice(0, 2); // Ensure unique tags per post
      return post;
    });
  
    console.time("posts")
    await this.postRepo.save(posts);
    console.timeEnd("posts")
    const comments = Array.from({ length: 100000 }, (_, i) => {
      const comment = new Comment();
      comment.content = `This is comment ${i + 1}`;
      comment.post = posts[Math.floor(Math.random() * posts.length)];
      return comment;
    });
  
    console.time("comments")
    await this.commentRepo.save(comments);
    console.timeEnd("comments")
  }
  
}
