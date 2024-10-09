import { Post } from 'src/posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Post, (post) => post.postCreator)
  createdPosts: Post[];

  @Column({ length: 500, nullable: false })
  username: string;

  @Column({ length: 500, nullable: false })
  hashedPassword: string;

  @Column({ nullable: false })
  darkMode: boolean;
}
