import { IsNotEmpty, IsString } from 'class-validator';

export class FindUserBeforeLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
