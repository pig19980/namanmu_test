import { User } from 'src/users/entities/user.entity';

export class CreatePostDto {
  title: string;
  content: string;
}

export interface _CreatePostDto {
  postCreator: User;
  title: string;
  content: string;
}
