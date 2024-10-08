import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    if (await this.usersService.create(createUserDto)) {
      return {
        message: '성공',
        code: 'S001',
      };
    } else {
      return {
        message: '이미 존재하는 유저네임입니다.',
        status: 'CONFLICT',
        errors: [],
        code: 'U002',
      };
    }
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user: User = await this.usersService.findUser(username, password, false);
    if (user) {
      return user;
    } else {
      return null;
      // todo: change to throw error
    }
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      hashedPassword: user.hashedPassword,
    };
    return {
      data: {
        darkMode: user.darkMode,
        jwtToken: this.jwtService.sign(payload),
      },
      message: '성공',
      code: 'S001',
    };
  }
}
