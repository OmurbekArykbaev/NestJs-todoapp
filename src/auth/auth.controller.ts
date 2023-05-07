import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { AuthGuard } from './auth.guard';
import { SignUpDto } from './dto/SignUp.dto';
import { UsersService } from '../users/users.service';
import { UserInterface } from 'src/users/users.interface';

@Controller('auth')
@UsePipes(new ValidationPipe())
export class AuthContoller {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  signIn(
    @Body() signInDTO: SignInDto,
  ): Promise<{ access_token: string; user: UserInterface }> {
    return this.authService.signIn(signInDTO.username, signInDTO.password);
  }

  @Post('signup')
  signUp(@Body() signUpDTO: SignUpDto): Promise<string> {
    return this.usersService.createUser(signUpDTO);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(): string {
    return 'you passed auth)';
  }
}
