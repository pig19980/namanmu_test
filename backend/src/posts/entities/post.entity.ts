import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Comment, CommentSend } from 'src/comments/entities/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.createdPosts)
  postCreator: User;

  @OneToMany(() => Comment, (comment) => comment.commentPostedAt)
  postComments: Comment[];

  @Column({ length: 255, nullable: false })
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  likes: number;

  @Column()
  imageURL: string;
}

export interface PostSend {
  id: number;
  createdUsername: string;
  title: string;
  content: string;
  createdAt: Date;
  likes: number;
  imageURL: string;
}

export interface PostViewSend {
  Post: PostSend;
  Comments: CommentSend[];
}
