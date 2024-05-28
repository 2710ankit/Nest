import {
  BadRequestException,
  Injectable,
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

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

    const user = await this.userRepo.findOne({
      where: {
        username,
      },
    });

    if (!user || !(await compareHash(password, user.password))) {
      throw new UnauthorizedException('Username or Password INVALID');
    }

    const token = await this.jwtService.signAsync({ userId: user.id });

    return res.setHeader('Authorization', token).status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  }

  async createUser(createUserDto: any) {
    const { username, password } = createUserDto;

    if (!username || !password)
      throw new BadRequestException('Username or Password not found');

    const user = await this.userRepo.findOne({
      where: {
        username,
      },
    });

    if (user) throw new BadRequestException('Username already exists');
    const hash = await generateHash(password);
    const newUser = this.userRepo.create({
      username: username,
      password: hash,
    });

    await this.userRepo.save(newUser);

    return {
      message: 'success',
      data: newUser,
    };
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
