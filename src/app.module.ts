import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { databaseProviders } from './database.providers';

@Module({
  imports: [...databaseProviders, UserModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
