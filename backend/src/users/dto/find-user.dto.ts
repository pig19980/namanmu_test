import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FindUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
