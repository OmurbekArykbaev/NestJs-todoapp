import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // console.log(token);

    if (!token) {
      throw new HttpException('Вы не авторизованы', HttpStatus.UNAUTHORIZED);
    }

    try {
      const payload = await this.jwtService.verify(token, { secret: '123' });
      request['user'] = payload;
    } catch {
      throw new HttpException('Ошибка аутентификации', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  private extractTokenFromHeader(request: IAuthRequest): string | undefined {
    const req = request.headers.authorization?.split(' ') ?? [];
    return req[0] === 'Bearer' ? req[1] : undefined;
  }
}

export type IAuthRequest = Request & {
  headers: { authorization: string };
};
