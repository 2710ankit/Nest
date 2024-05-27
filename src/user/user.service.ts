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
import { compareHash, generateHash } from 'src/utils/bcrypt.util';

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
      },
    });

    if (!user || !(await compareHash(password, user.password))) {
      throw new UnauthorizedException('Username or Password INVALID');
    }

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
