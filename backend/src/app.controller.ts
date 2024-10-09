import { Controller, Get, Res, Req, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthRequest } from './auth/auth-request.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(@Res() res: Response) {
    res.sendFile(join(__dirname, '../../frontend', 'index.html'));
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  getProtected(@Req() request: AuthRequest) {
    const user = request.user; // JWT에서 decode된 정보
    return {
      message: 'This is a protected route',
      user,
    };
  }
}
