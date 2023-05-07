import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/createTodo.dto';
import { UpdateTodoDTO } from './dto/updateTodo.dto';
import { TodoInterface } from './todo.interface';
import { User } from 'src/users/user.decorator';
import { UserEntity } from 'src/users/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todo')
export class TodoContorller {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTodos(): Promise<TodoInterface[]> {
    return this.todoService.getTodos();
  }

  @Get('author/:author')
  async getTodosByAuthor(
    @Param('author') currentUsername: string,
  ): Promise<TodoInterface[]> {
    return await this.todoService.getTodosByAuthor(currentUsername);
  }

  @Get(':id')
  async getTodo(
    @Param('id', new ParseIntPipe()) todoId: number,
  ): Promise<TodoInterface> {
    return this.todoService.getTodo(todoId);
  }

  @Post('/create')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async createTodo(
    @User() currentUser: UserEntity,
    @Body() createTodoTDO: CreateTodoDTO,
  ): Promise<TodoInterface> {
    console.log('create user ' + currentUser);
    return this.todoService.createTodo(currentUser, createTodoTDO);
  }

  @Put(':id/update')
  @UseGuards(AuthGuard)
  async updateTodo(
    @Body() updateTodoDTO: UpdateTodoDTO,
    @Param('id', new ParseIntPipe()) currentTodoID: number,
    @User('id') currentUsername: number,
  ): Promise<TodoInterface> {
    return this.todoService.updateTodo(
      currentUsername,
      currentTodoID,
      updateTodoDTO,
    );
  }

  @Delete(':id/delete')
  @UseGuards(AuthGuard)
  async deleteTodo(
    @Param('id', new ParseIntPipe()) currentTodoId: number,
    @User('id') currentUserId: number,
  ): Promise<{ message: string }> {
    return this.todoService.deleteTodo(currentTodoId, currentUserId);
  }
}
