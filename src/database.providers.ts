import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { TaskLogger } from './logger/tasks-logger';
// import { TaskLogger } from './logger/tasks-logger';

export const databaseProviders = [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'learning_tasks',
    entities: [],
    synchronize: true,
    autoLoadEntities: true,
    // logging:["query"],
    // logger:new TaskLogger()
  }),

  MongooseModule.forRoot('mongodb://localhost/learning-tasks'),
];
