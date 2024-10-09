import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  NotImplementedException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostSend } from './entities/post.entity';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Payload } from 'src/auth/payload.interface';
import { AuthRequest } from 'src/auth/auth-request.interface';

import { FindUserAfterLoginDto } from 'src/users/dto/find-user-after-login.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body: CreatePostDto, @Req() request: AuthRequest) {
    const payload: Payload = request.payload;
    console.log(payload);
    const findUserAfterLoginDto: FindUserAfterLoginDto = payload;
    const user: User = await this.usersService.findUserAfterLogin(findUserAfterLoginDto);
    if (user == null) {
      throw new BadRequestException('옳지 않은 JWT 요청');
    }
    body.createdUserId = user.id;
    if (!this.postsService.create(body)) {
      throw new NotImplementedException('게시물 작성 실패');
    }
    let response = await this.findAll();
    response['message'] = '게시물 작성 성공';
    return response;
  }

  @Get()
  async findAll() {
    const postSends: PostSend[] = await this.postsService.findAll();
    console.log(postSends);

    return {
      data: {
        Posts: postSends,
      },
      message: '게시물 조회 성공',
    };
  }
}
