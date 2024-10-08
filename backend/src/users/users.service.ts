import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { User } from './entities/user.entity';
import * as bcrpyt from 'bcryptjs';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrpyt.hash(createUserDto.password, 10);
    const user = new User(createUserDto.username, hashedPassword);
    this.users.push(user);
  }

  async findOne(username: string, password: string) {
    const user: User = this.users.find((u) => u.username === username);
    if (user && (await bcrpyt.compare(password, user.hashedPassword))) {
      return user;
    } else {
      return null;
    }
  }
}
