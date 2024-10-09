import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateCommentDto {
  id: number;
  content: string;
}

export interface _CreateCommentDto {
  commentCreator: User;
  commentPostedAt: Post;
  content: string;
}
