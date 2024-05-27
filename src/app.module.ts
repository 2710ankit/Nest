import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { databaseProviders } from './database.providers';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [...databaseProviders, UserModule, TasksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
