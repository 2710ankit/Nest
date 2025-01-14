import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SessionInterceptor implements NestInterceptor {
  constructor(private readonly redisService: RedisService) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    // Your interceptor logic goes here

    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    const token = req.headers.authorization;
    const user = await this.redisService.getCache(token); 

    if (req.url === '/api/auth/login' && !user) return next.handle();
    if (user) {
      this.redisService.setCache(token, user);
    } else {
      throw new UnauthorizedException();
    }

    return next.handle();
  }
}
