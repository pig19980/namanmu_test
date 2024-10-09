import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Post, (post) => post.postCreator)
  createdPosts: Post[];

  @OneToMany(() => Comment, (comment) => comment.commentCreator)
  createdComments: Comment[];

  @Column({ length: 500, nullable: false })
  username: string;

  @Column({ length: 500, nullable: false })
  hashedPassword: string;

  @Column({ nullable: false })
  darkMode: boolean;
}
