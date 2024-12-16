// import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AppService {
  constructor(private redisServie: RedisService) {}
  async getHello() {
 
    try {
      await this.redisServie.setCache('name', 'Ankit', 10000);
      // this.redisServie.clearCache()
      // await this.redisServie.getCache('name1');
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
