import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserInterface } from 'src/users/users.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService)) private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; user: UserInterface }> {
    const user = await this.usersService.getOneUserForValidateSigIn(username);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const comparedPassword = await compare(pass, user.password);

    if (!comparedPassword) {
      throw new HttpException('Не верный пароль', HttpStatus.UNAUTHORIZED);
    }

    return {
      access_token: await this.generateToken(user),
      user,
    };
  }

  async generateToken(user) {
    const payload = { username: user.username, sub: user.userId };
    return await this.jwtService.signAsync(payload, {
      secret: '123',
      expiresIn: 60 * 60,
    });
  }
}
