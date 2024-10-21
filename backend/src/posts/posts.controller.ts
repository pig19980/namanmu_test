import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  NotImplementedException,
  HttpException,
  HttpStatus,
  UseFilters,
  UsePipes,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { _CreatePostDto, CreatePostDto } from './dto/create-post.dto';
import { PostSend, PostViewSend } from './entities/post.entity';
import { Post as _Post } from './entities/post.entity';

import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthRequest } from 'src/auth/auth-request.interface';

import { User } from 'src/users/entities/user.entity';
import { ViewCommentsDto } from './dto/view-comments.dto';
import { CommentSend } from 'src/comments/entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

import { CommentsService } from 'src/comments/comments.service';

import { CustomPipe } from 'src/custom.pipe';
import { PostsFilter } from './posts.filter';
import { PostsPipe } from './posts.pipe';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new PostsPipe())
  @UseFilters(new PostsFilter())
  @Post('create')
  async create(@Body() createPostDto: CreatePostDto, @Req() request: AuthRequest) {
    console.log('start');
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
  @UseFilters(new PostsFilter())
  async findAll() {
    try {
      const postSends: PostSend[] = await this.postsService.findAllResponse();

      return {
        data: {
          Posts: postSends,
        },
        message: '게시물 조회 성공',
      };
    } catch (error) {
      const newErr: Error = new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
      throw newErr;
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Post('view')
  async viewComments(@Body() viewCommentsDto: ViewCommentsDto) {
    const id: number = viewCommentsDto.id;
    const postViewSend: PostViewSend = await this.postsService.findAllCommentsResponse(id);
    console.log(postViewSend);

    return {
      data: postViewSend,
      message: '게시물 확대 성공',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('comment')
  async createComment(@Body() createCommentDto: CreateCommentDto, @Req() request: AuthRequest) {
    const commentCreator: User = request.user;
    if (commentCreator == null) {
      throw new BadRequestException('옳지 않은 JWT 요청');
    }
    const { id, content } = { ...createCommentDto };
    const commentPostedAt: _Post = await this.postsService.findById(id);
    if (commentPostedAt == null) {
      throw new BadRequestException('존재하지 않은 게시물 id');
    }
    if (!(await this.commentsService.create({ commentCreator, commentPostedAt, content }))) {
      throw new BadRequestException('게시물 작성 실패');
    }
    const postViewSend: PostViewSend = await this.postsService.findAllCommentsResponse(id);
    console.log(postViewSend);

    return {
      data: postViewSend,
      message: '댓글 확대 성공',
    };
  }
}
