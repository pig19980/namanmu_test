import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  private posts = [];

  create(post: any) {
    this.posts.push(post);
  }

  findAll() {
    return this.posts;
  }
}
