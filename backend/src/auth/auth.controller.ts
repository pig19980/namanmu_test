import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FindUserDto } from 'src/users/dto/find-user.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    console.log('regi start');
    return await this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: FindUserDto) {
    const user = await this.authService.validateUser(body.username, body.password);
    return await this.authService.login(user);
  }
}
