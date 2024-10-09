import { Injectable } from '@nestjs/common';
import { _CreateCommentDto } from './dto/create-comment.dto';
import { PostsService } from 'src/posts/posts.service';
import { Post } from '@nestjs/common';

@Injectable()
export class CommentsService {
  async create(_createCommentDto: _CreateCommentDto): Promise<boolean> {
    return true;
  }

  async findAll() {
    return `This action returns all comments`;
  }
}
