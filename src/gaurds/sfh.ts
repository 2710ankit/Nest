import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { SECRET_KEY } from 'src/auth/auth.module';
  
  @Injectable()
  export class Asd implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      // const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      //   context.getHandler(),
      //   context.getClass(),
      // ]);
      // if (isPublic) {
      //   // 💡 See this condition
      //   return true;
      // }
  
      const request = context.switchToHttp().getRequest();
  
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: SECRET_KEY,
        });
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      return request.header('Authorization');
    }
  }
  