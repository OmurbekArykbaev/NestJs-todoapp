import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UserInterface,
  UserInterfaceResponse,
} from 'src/users/users.interface';
import { SignUpDto } from 'src/auth/dto/SignUp.dto';
// import { UserEntity } from './users.entity';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './user.entity';

import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getOneUserForValidateSigIn(username: string): Promise<UserInterface> {
    return await this.userRepository.findOne({ where: { username: username } });
  }

  async getUserByUsername(
    currentUsername: string,
  ): Promise<UserInterfaceResponse> {
    const user = await this.userRepository.findOne({
      where: { username: currentUsername },
    });

    const { password, ...rest } = user;
    return rest;
  }

  async getCurrentUser(currentId: number): Promise<UserInterfaceResponse> {
    const user = await this.userRepository.findOne({
      where: { id: currentId },
    });
    const { password, ...rest } = user;
    return rest;
  }

  async getAllUsers(): Promise<UserInterfaceResponse[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser(signUpDto: SignUpDto): Promise<string> {
    console.log('Есть запрос');
    const newUser = await this.userRepository.findOne({
      where: { username: signUpDto.username },
    });

    if (newUser) {
      throw new HttpException(
        'Данный пользовтель уже существует в базе',
        HttpStatus.BAD_GATEWAY,
      );
    }

    const userFromPG = await this.userRepository.save({
      ...signUpDto,
      password: await this.hashPassword(signUpDto.password),
    });

    return 'Авторизация прошла успешно';
  }

  async removeUserById(userId: number): Promise<{ msg: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new HttpException('Юзер не обнаружен', HttpStatus.NOT_FOUND);
    }
    try {
      await this.userRepository.delete(user);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return { msg: 'Юзер удален' };
  }

  async hashPassword(password: string) {
    return await hash(password, 10);
  }
}
