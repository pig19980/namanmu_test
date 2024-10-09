export class Post {
  private static currentId = 0;

  id: number;
  createdUserId: number;
  title: string;
  content: string;
  createdAt: Date;
  likes: number;

  constructor(createdUserId: number, title: string, content: string) {
    this.id = Post.currentId++;
    this.createdUserId = createdUserId;
    this.title = title;
    this.content = content;
    this.createdAt = new Date();
    this.likes = 0;
  }
}

export interface PostSend {
  id: number;
  username: string;
  title: string;
  content: string;
  createdAt: Date;
  likes: number;
}
