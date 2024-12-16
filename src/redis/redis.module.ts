import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-yet';
import { RedisService } from './redis.service'; 

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'redis-16513.c12.us-east-1-4.ec2.redns.redis-cloud.com',
            port: 16513,
          },
          password: 'etdrTGSPGBN9FZeQ2gd266z9iJy1IXQL',
          username: 'default',
        });

        return {
          store: store as unknown as CacheStore,
          ttl: 0, // 3 minutes (milliseconds)
        };
      },
    }),
  ],
  providers: [RedisService],
  exports: [RedisService], 
})
export class RedisModule {}
