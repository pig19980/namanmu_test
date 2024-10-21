import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { FindUserBeforeLoginDto } from './dto/find-user-before-login.dto';
import { User } from './entities/user.entity';
import { CustomPipe } from 'src/custom.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @UsePipes(new CustomPipe())
  async register(@Body() createUserDto: CreateUserDto) {
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
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Query('sort', ParseBoolPipe) sort: boolean) {
    console.log(id, sort);
    console.log(typeof id === 'number'); // true
    console.log(typeof sort === 'boolean'); // true
    return 'This action returns a user';
  }
}
