import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { User } from './entities/user.entity';
import * as bcrpyt from 'bcryptjs';

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

  async findUser(findUserDto: FindUserDto): Promise<User> {
    const user: User = this.users.find((u) => u.username === findUserDto.username);
    if (!user) {
      return null;
    }

    if (findUserDto.isHashed && user.hashedPassword !== findUserDto.password) {
      return null;
    } else if (!findUserDto.isHashed && !(await bcrpyt.compare(findUserDto.password, user.hashedPassword))) {
      return null;
    }
    return user;
  }
}
