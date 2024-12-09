// import { Logger } from '@nestjs/common';
// import { QueryRunner, Logger as TypeOrmLogger } from 'typeorm';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { TaskLog } from 'src/tasks/schema/tasks-logs.schema';
// // import { TaskLogs } from './task-logs.schema';

// export class TaskLogger implements TypeOrmLogger {
//   private readonly logger = new Logger('SQL');

//   constructor(
//     // @InjectModel(TaskLog.name)
//     // private readonly taskLogsModel: Model<TaskLog>,
//   ) {}

//   logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
//     // this.logger.log(query);

//     console.log(query,"query")
//     // console.log(parameters,"parameters")
//     // console.log(queryRunner,"queryRunner")

//     // Save the query to MongoDB
//     // const taskLog = new this.taskLogsModel({
//     //   query,
//     //   parameters,
//     //   timestamp: new Date(),
//     // });
//     // taskLog.save().catch(err => this.logger.error('Failed to save query log', err));
//   }

//   // Implement other log methods if needed (logSchemaBuild, logMigration, etc.)
//   logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
//     this.logger.error(error);

//     // const taskLog = new this.taskLogsModel({
//     //   query,
//     //   parameters,
//     //   error,
//     //   timestamp: new Date(),
//     // });
//     // taskLog.save().catch(err => this.logger.error('Failed to save query error log', err));
//   }

//   logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
//     this.logger.warn(`Query is slow: ${time}ms`);

//     // const taskLog = new this.taskLogsModel({
//     //   query,
//     //   parameters,
//     //   time,
//     //   timestamp: new Date(),
//     // });
//     // taskLog.save().catch(err => this.logger.error('Failed to save slow query log', err));
//   }

//   logMigration(message: string, queryRunner?: QueryRunner) {
//     this.logger.log(message);
//   }

//   logSchemaBuild(message: string, queryRunner?: QueryRunner) {
//     this.logger.log(message);
//   }

//   log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
//     if (level === 'log' || level === 'info') {
//       this.logger.log(message);
//     } else if (level === 'warn') {
//       this.logger.warn(message);
//     }
//   }
// }
