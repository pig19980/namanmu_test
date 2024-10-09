import { IsString } from 'class-validator';

export class FindUserBeforeLoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
