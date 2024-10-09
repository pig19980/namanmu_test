import { Controller, Post, Body, Req, BadRequestException } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { _CreateCommentDto, CreateCommentDto } from './dto/create-comment.dto';
import { AuthRequest } from 'src/auth/auth-request.interface';
import { User } from 'src/users/entities/user.entity';

import { Post as _Post } from 'src/posts/entities/post.entity';
import { PostsService } from 'src/posts/posts.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly postsService: PostsService,
  ) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Req() request: AuthRequest) {
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
    let response = await this.commentsService.findAll();
    response['message'] = '댓글 작성 성공';
    return response;
  }
}
