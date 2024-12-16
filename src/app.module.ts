import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseProviders } from './database.providers';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { RedisModule } from './redis/redis.module';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SessionInterceptor } from './interceptors/session-interceptor';

@Module({
  imports: [
    ...databaseProviders,
    UserModule,
    TasksModule,
    AuthModule,
   /*
      MADE A MODULE
      MADE ITS SERVICE
      To use the module's service, need to add service in the export of  the module
      and import the module in the module in which the service is going to be used.
   */
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide:APP_INTERCEPTOR,
      useClass:SessionInterceptor
    }
  ],
  
}) 
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('');
  }
}
