import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/exception-handler.util';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.setGlobalPrefix('/api');
  app.use(cookieParser());
  // const upload = multee({ dest: 'uploads/' })
  app.enableCors({
    exposedHeaders: ['Authorization'],
    credentials:true
  });
  await app.listen(3001);
}
bootstrap();
