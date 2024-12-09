import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { Otp, OtpSchema } from './schema/otp.shema';
import { MongooseModule } from '@nestjs/mongoose';

export const SECRET_KEY = 'lsfjnosns@#$%^&hjbad';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    TypeOrmModule.forFeature([User]),
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
  ],
})
export class AuthModule {}
