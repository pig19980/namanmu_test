import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdUserId: number;

  @Column({ length: 255, nullable: false })
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  likes: number;
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
