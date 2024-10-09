import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from 'src/users/users.service';
import { Post, PostSend } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
  ) {}

  async create({ createdUserId, title, content }: CreatePostDto): Promise<boolean> {
    const post = this.postRepository.create({ createdUserId, title, content });
    await this.postRepository.save(post);

    console.log(post);
    return true;
  }

  async findAll(): Promise<PostSend[]> {
    const posts: Post[] = await this.postRepository.find();

    return await Promise.all(
      posts.map(async (post) => ({
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
