import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from 'src/users/users.service';
import { Post, PostSend } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}
  private posts: Post[] = [];

  create(createPostDto: CreatePostDto) {
    const post = new Post(createPostDto.createdUserId, createPostDto.title, createPostDto.content);
    this.posts.push(post);
  }

  async findAll(): Promise<PostSend[]> {
    return await Promise.all(
      this.posts.map(async (post) => ({
        id: post.id,
        createdUsername: await this.usersService.getUserName(post.createdUserId),
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        likes: post.likes,
        imageURL: 'not maid image DB',
      })),
    );
  }
}
