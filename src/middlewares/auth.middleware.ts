import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthRequestInterface } from 'src/auth/auth.interface';
import { UserEntity } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UsersService) {}

  async use(req: AuthRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.userAuth = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const jwtDecodeToken = verify(token, '123') as UserEntity;

      // console.log('middleware ' + jwtDecodeToken.username);
      const user = await this.userService.getUserByUsername(
        jwtDecodeToken.username,
      );

      // console.log('after middleware ' + user.username);

      req.userAuth = user;

      next();
      return;
    } catch (error) {
      console.error(error);
      req.userAuth = null;
      next();
      return;
    }
  }
}
