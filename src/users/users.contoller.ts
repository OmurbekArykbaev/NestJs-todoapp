import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './user.decorator';
import {
  UserInterface,
  UserInterfaceResponse,
} from 'src/users/users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getCurrentUser(
    @User('id') currentId: number,
  ): Promise<UserInterfaceResponse> {
    return await this.usersService.getCurrentUser(currentId);
  }

  @Get('name')
  async getUserByUsername(
    @User('username') currentuserName: string,
  ): Promise<UserInterfaceResponse> {
    return await this.usersService.getUserByUsername(currentuserName);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async getAllUsers(): Promise<UserInterfaceResponse[]> {
    return await this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async removeUserById(@Param('id') userId: number): Promise<{ msg: string }> {
    return await this.usersService.removeUserById(userId);
  }
}
