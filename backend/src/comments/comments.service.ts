import { Inject, Injectable } from '@nestjs/common';
import { _CreateCommentDto } from '../posts/dto/create-comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<Comment>,
  ) {}
  async create({ commentCreator, commentPostedAt, content }: _CreateCommentDto): Promise<boolean> {
    const comment: Comment = this.commentRepository.create({ commentCreator, commentPostedAt, content });
    await this.commentRepository.save(comment);

    console.log(comment);
    return true;
  }
}
