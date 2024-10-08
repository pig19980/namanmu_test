import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    await this.usersService.create(createUserDto);
    return {
      message: '회원가입 성공',
    };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user: User = await this.usersService.findUser({ username, password, isHashed: false });
    if (!user) {
      throw new UnauthorizedException('올바르지 않은 username 혹은 password입니다.');
    }
    return user;
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
      message: '로그인 성공',
    };
  }
}
