import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.createdPosts)
  postCreator: User;

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
