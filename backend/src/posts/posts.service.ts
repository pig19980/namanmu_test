import { ConflictException, Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { _CreatePostDto } from './dto/create-post.dto';
import { UsersService } from 'src/users/users.service';
import { Post, PostSend, PostViewSend } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Comment, CommentSend } from 'src/comments/entities/comment.entity';

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

  async findById(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async findAllResponse(): Promise<PostSend[]> {
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

  async findByIdPostResponse(id: number): Promise<PostSend> {
    const post: Post = await this.postRepository.findOne({ where: { id }, relations: ['postCreator'] });
    if (post == null) {
      throw new ConflictException('이미 존재하는 사용자 이름입니다.');
    }
    return {
      id: post.id,
      createdUsername: post.postCreator.username,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      likes: post.likes,
      imageURL: post.imageURL,
    };
  }

  async findAllCommentsResponse(id: number): Promise<PostViewSend> {
    const post: Post = await this.postRepository.findOne({
      where: { id },
      relations: ['postCreator', 'postComments', 'postComments.commentCreator'],
    });
    if (post == null) {
      throw new NotImplementedException('게시물 찾기 실패');
    }
    const comments: Comment[] = post.postComments;

    const postSend: PostSend = {
      id: post.id,
      createdUsername: post.postCreator.username,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      likes: post.likes,
      imageURL: post.imageURL,
    };
    const commentSends: CommentSend[] = await Promise.all(
      comments.map(async (comment) => ({
        id: comment.id,
        createdUsername: comment.commentCreator.username,
        content: comment.content,
        createdAt: comment.createdAt,
        likes: comment.likes,
      })),
    );

    return { Post: postSend, Comments: commentSends };
  }
}
