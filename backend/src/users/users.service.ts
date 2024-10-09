import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserBeforeLoginDto } from './dto/find-user-before-login.dto';
import { User } from './entities/user.entity';
import * as bcrpyt from 'bcryptjs';
import { FindUserAfterLoginDto } from './dto/find-user-after-login.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create({ username, password }: CreateUserDto): Promise<boolean> {
    const oldUser: User = await this.userRepository.findOne({ where: { username } });
    if (oldUser) {
      throw new ConflictException('이미 존재하는 사용자 이름입니다.');
    }

    const hashedPassword = await bcrpyt.hash(password, 10);
    const user: User = this.userRepository.create({ username, hashedPassword, darkMode: false });
    await this.userRepository.save(user);

    console.log(user);
    return true;
  }

  async find(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findUserBeforeLogin({ username, password }: FindUserBeforeLoginDto): Promise<User> {
    const user: User = await this.find(username);
    if (!user || !(await bcrpyt.compare(password, user.hashedPassword))) {
      return null;
    }
    return user;
  }

  async findUserAfterLogin({ username, hashedPassword }: FindUserAfterLoginDto): Promise<User> {
    const user: User = await this.find(username);
    if (!user || user.hashedPassword !== hashedPassword) {
      return null;
    }
    return user;
  }

  async getUserName(userId: number): Promise<string> {
    const user: User = await this.userRepository.findOne({ where: { id: userId } });
    return user.username;
  }
}
