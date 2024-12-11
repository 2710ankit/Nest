import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
 

  async getCache(key: string) {
    return await this.cacheManager.get(key);
  }

  async setCache(key: string, value: any) {
    return await this.cacheManager.set(key, value);
  }
}
