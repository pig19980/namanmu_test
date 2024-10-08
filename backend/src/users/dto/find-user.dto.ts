import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsBoolean()
  isHashed: boolean;

  constructor(username: string, password: string, isHashed: boolean) {
    this.username = username;
    this.password = password;
    this.isHashed = isHashed;
  }
}
