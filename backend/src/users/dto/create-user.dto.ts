import { isByteLength, IsNotEmpty, IsNumber, IsOptional, isString, IsString } from 'class-validator';
import { use } from 'passport';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
