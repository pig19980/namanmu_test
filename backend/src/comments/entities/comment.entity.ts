import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.createdComments)
  commentCreator: User;

  @ManyToOne(() => Post, (post) => post.postComments)
  commentPostedAt: Post;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  likes: number;
}
