import { Inject, Injectable } from '@nestjs/common';
import { _CreatePostDto } from './dto/create-post.dto';
import { UsersService } from 'src/users/users.service';
import { Post, PostSend } from './entities/post.entity';
import { Repository } from 'typeorm';

function getRandomInt(): number {
  return Math.floor(Math.random() * 2);
}

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
  ) {}

  async create({ postCreator, title, content }: _CreatePostDto): Promise<boolean> {
    const post = this.postRepository.create({ postCreator, title, content, imageURL: `img/${getRandomInt()}.jpg` });
    await this.postRepository.save(post);

    console.log(post);
    return true;
  }

  async findAll(): Promise<PostSend[]> {
    const posts: Post[] = await this.postRepository.find({ relations: ['postCreator'] });

    return await Promise.all(
      posts.map(async (post) => ({
        id: post.id,
        createdUsername: post.postCreator.username,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        likes: post.likes,
        imageURL: post.imageURL,
      })),
    );
  }
}
