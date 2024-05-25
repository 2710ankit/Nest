import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  loginCred = {
    username: 'ankit',
    password: 'asdasdasd',
  };

  async signIn(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    if (!username || !password)
      throw new BadRequestException('Username or Password not found');

    const user = await this.userRepo.findOne({
      where: {
        username,
        password
      },
    });

    console.log(user)

    if (!user) throw new BadRequestException('Invalid Username or password');

    return 'Logged in successfully';
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

    const newUser = this.userRepo.create({
      username: username,
      password: password,
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
