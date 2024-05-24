import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  loginCred = {
    username: 'ankit',
    password: 'asdasdasd',
  };

  signIn(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    if (!username || !password)
      throw new BadRequestException('Username or Password not found');

    if (
      username !== this.loginCred.username ||
      password !== this.loginCred.password
    )
      throw new UnauthorizedException('Username or Password not Correct');

    return 'Logged in successfully';
  }

  createUser(createUserDto: any) {
    const { username, password } = createUserDto;
 
    if (!username || !password)
      throw new BadRequestException('Username or Password not found');

    //  TODO :- check for already existing user

    this.loginCred = { ...createUserDto };

    return {
      message: 'success',
      data: createUserDto,
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
