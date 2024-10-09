import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './payload.interface';
import { AuthRequest } from './auth-request.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: AuthRequest = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new ForbiddenException('로그인이 필요한 행위입니다.');
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      const { username, hashedPassword }: Payload = decoded;
      request.payload = { username, hashedPassword };
      return true;
    } catch (err) {
      throw new ForbiddenException('JWT 토큰이 올바르지 않습니다.');
    }
  }
}
