import { Inject, Injectable } from '@nestjs/common';
import { _CreateCommentDto } from '../posts/dto/create-comment.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
  ) {}
  async create(_createCommentDto: _CreateCommentDto): Promise<boolean> {
    return true;
  }
}
