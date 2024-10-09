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
import { _CreatePostDto, CreatePostDto } from './dto/create-post.dto';
import { PostSend } from './entities/post.entity';
import { Post as _Post } from './entities/post.entity';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthRequest } from 'src/auth/auth-request.interface';

import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { ViewCommentsDto } from './dto/view-comments.dto';
import { CommentSend } from 'src/comments/entities/comment.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() createPostDto: CreatePostDto, @Req() request: AuthRequest) {
    const postCreator: User = request.user;
    if (postCreator == null) {
      throw new BadRequestException('옳지 않은 JWT 요청');
    }

    const _createPostDto: _CreatePostDto = { ...createPostDto, postCreator };
    if (!(await this.postsService.create(_createPostDto))) {
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

  @Post('view')
  async viewComments(@Body() viewCommentsDto: ViewCommentsDto) {
    const id: number = viewCommentsDto.id;
    const commentSends: CommentSend[] = await this.postsService.findAllComments(id);
    console.log(commentSends);

    return {
      data: {
        Comments: commentSends,
      },
      message: '게시물 확대 성공',
    };
  }
}
