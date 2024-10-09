import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500, nullable: false })
  username: string;

  @Column({ length: 500, nullable: false })
  hashedPassword: string;

  @Column({ nullable: false })
  darkMode: boolean;
}
