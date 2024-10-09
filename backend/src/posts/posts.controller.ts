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

import { User } from 'src/users/entities/user.entity';
import { ViewCommentsDto } from './dto/view-comments.dto';
import { CommentSend } from 'src/comments/entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

import { CommentsService } from 'src/comments/comments.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

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
    const commentSends: CommentSend[] = await this.postsService.findAllComments(id);
    console.log(commentSends);

    return {
      data: {
        Comments: commentSends,
      },
      message: '댓글 확대 성공',
    };
  }
}
