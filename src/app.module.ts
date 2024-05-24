import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [UserModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
