import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(@Res() res: Response) {
    res.sendFile(join(__dirname, '../../frontend', 'index.html'));
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
