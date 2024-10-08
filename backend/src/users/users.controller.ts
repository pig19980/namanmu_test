import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { FindUserBeforeLoginDto } from './dto/find-user-before-login.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    console.log('regi start');
    await this.usersService.create(createUserDto);
    return {
      message: '회원가입 성공',
    };
  }

  @Post('login')
  async login(@Body() body: FindUserBeforeLoginDto) {
    const user: User = await this.usersService.findUserBeforeLogin(body);
    if (user == null) {
      throw new UnauthorizedException('올바르지 않은 username 혹은 password입니다.');
    }
    console.log(user);
    const jwtToken = await this.authService.signUser(user);
    return {
      data: {
        darkMode: user.darkMode,
        jwtToken: jwtToken,
      },
      message: '로그인 성공',
    };
  }
}
