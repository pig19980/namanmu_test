import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserBeforeLoginDto } from './dto/find-user-before-login.dto';
import { User } from './entities/user.entity';
import * as bcrpyt from 'bcryptjs';
import { FindUserAfterLoginDto } from './dto/find-user-after-login.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    const oldUser: User = this.users.find((u) => u.username === createUserDto.username);
    if (oldUser) {
      throw new ConflictException('이미 존재하는 사용자 이름입니다.');
    }

    const hashedPassword = await bcrpyt.hash(createUserDto.password, 10);
    const user = new User(createUserDto.username, hashedPassword);
    this.users.push(user);
    console.log(this.users);
    return true;
  }

  async find(username: string): Promise<User> {
    return this.users.find((u) => u.username === username);
  }

  async findUserBeforeLogin(findUserBeforeLoginDto: FindUserBeforeLoginDto): Promise<User> {
    const user: User = await this.find(findUserBeforeLoginDto.username);
    if (!user || !(await bcrpyt.compare(findUserBeforeLoginDto.password, user.hashedPassword))) {
      return null;
    }
    return user;
  }

  async findUserAfterLogin(findUserAfterLogin: FindUserAfterLoginDto): Promise<User> {
    const user: User = await this.find(findUserAfterLogin.username);
    if (!user || user.hashedPassword !== findUserAfterLogin.hashedPassword) {
      return null;
    }
    return user;
  }
}
