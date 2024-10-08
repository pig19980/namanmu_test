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
}
