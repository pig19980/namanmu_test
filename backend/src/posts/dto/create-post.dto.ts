import { User } from 'src/users/entities/user.entity';

export class CreatePostDto {
  postCreator: User;
  title: string;
  content: string;
}
