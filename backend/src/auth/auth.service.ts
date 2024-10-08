import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './payload.interface';

import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signUser(user: User): Promise<string> {
    const { username, hashedPassword }: Payload = user;
    return this.jwtService.sign({ username, hashedPassword });
  }

  async login(user: User) {
    const payload: Payload = {
      username: user.username,
      hashedPassword: user.hashedPassword,
    };
    return {
      data: {
        darkMode: user.darkMode,
        jwtToken: this.jwtService.sign(payload),
      },
      message: '로그인 성공',
    };
  }
}
