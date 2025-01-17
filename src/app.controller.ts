import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseInterceptors(CacheInterceptor)
  // @CacheKey("name")
  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
