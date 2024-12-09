import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { compareHash, generateHash } from 'src/utils/bcrypt.util';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { generateOtp, sendSMS } from 'src/utils/otp.util';
import { SaveOtpDto } from './dto/save-otp.dto';
import { Otp } from './schema/otp.shema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// import { constants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectModel(Otp.name)
    private otpModel: Model<Otp>,

    private jwtService: JwtService,
  ) {}
  loginCred = {
    username: 'ankit',
    password: 'asdasdasd',
  };

  async signIn(createUserDto: CreateUserDto, res: Response) {
    const { username, password } = createUserDto;

    if (!username || !password)
      throw new BadRequestException('Username or Password not found');

    try {
      const user = await this.userRepo.findOne({
        where: {
          username,
        },
      });

      if (!user || !(await compareHash(password, user.password))) {
        throw new UnauthorizedException('Username or Password INVALID');
      }

      const token = await this.jwtService.signAsync({ userId: user.id });

      await this.saveOtpInMongo(user.id);

      return res.setHeader('Authorization', token).status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  saveOtpInMongo = async (userId: number) => {
    const otp = generateOtp();
    const createOtp = new this.otpModel({
      otp,
      userId,
    });

    const sendSmsPromise = sendSMS('+919877839963', `OTP Is ${otp}`);
    const saveOtpInDBPromise = createOtp.save();

    try {
      // const { sid }: { sid: string } = await

      // if can find a way such we can send different responses,
      // here saving db is less costly, then sending the sms
      // but we have to wait for sms to send, so that if there is some
      // error we can catch and send the error to client
      await Promise.race([sendSmsPromise, saveOtpInDBPromise]);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  };

  async createUser(createUserDto: any) {
    try {
      let { username, password, roles } = createUserDto;

      if (!username || !password)
        throw new BadRequestException('Username or Password not found');

      const user = await this.userRepo.findOne({
        where: {
          username,
        },
      });

      roles = roles ?? ['user'];

      if (user) throw new BadRequestException('Username already exists');
      const hash = await generateHash(password);
      const newUser = this.userRepo.create({
        username: username,
        password: hash,
        roles: roles,
      });

      await this.userRepo.save(newUser);

      return {
        message: 'success',
        data: newUser,
      };
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    try {
      await this.userRepo.delete(id);
    } catch (error) {
      console.log(error);
    }
    return {
      message: 'success',
      // data: newUser,
    };
  }
}
