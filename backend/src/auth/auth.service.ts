import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './payload.interface';

import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { FindUserAfterLoginDto } from 'src/users/dto/find-user-after-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async signUser(user: User): Promise<string> {
    const { username, hashedPassword }: Payload = user;
    return this.jwtService.sign({ username, hashedPassword });
  }

  async findUser(payload: Payload): Promise<User> {
    const findUserAfterLoginDto: FindUserAfterLoginDto = { ...payload };
    return this.usersService.findUserAfterLogin(findUserAfterLoginDto);
  }
}
