import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Status, TodoInterface } from './todo.interface';
import { CreateTodoDTO } from './dto/createTodo.dto';

import { UpdateTodoDTO } from './dto/updateTodo.dto';
import { TodosEntity } from './todos.entity';
import { UserEntity } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodosEntity)
    private readonly todoRepository: Repository<TodosEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getTodos(): Promise<TodosEntity[]> {
    const todos = await this.todoRepository.find();

    return todos;
  }

  async getTodosByAuthor(currentUsername: string): Promise<TodoInterface[]> {
    const user = await this.userRepository.findOne({
      where: { username: currentUsername },
    });

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const todo = await this.todoRepository.find({ where: { user: user } });

    if (!todo) {
      throw new HttpException('Туду не найден', HttpStatus.NOT_FOUND);
    }

    return todo;
  }

  async getTodo(todoId: number): Promise<TodoInterface> {
    const todo = await this.todoRepository.findOne({ where: { id: todoId } });

    if (!todo) {
      throw new HttpException('Туду не была найдена', HttpStatus.NOT_FOUND);
    }

    return todo;
  }

  async createTodo(
    currentUser: UserEntity,
    createTodoTDO: CreateTodoDTO,
  ): Promise<TodoInterface> {
    const todo = new TodosEntity();

    Object.assign(todo, createTodoTDO);

    todo.user = currentUser;

    return await this.todoRepository.save(todo);
  }

  async updateTodo(
    currentUserId: number,
    currentTodoID: number,
    updateTodoDTO: UpdateTodoDTO,
  ): Promise<TodoInterface> {
    const todo = await this.todoRepository.findOne({
      where: { id: currentTodoID },
    });

    if (!todo) {
      throw new HttpException('Туду не была найдена', HttpStatus.NOT_FOUND);
    }

    if (todo.user.id !== currentUserId) {
      throw new HttpException('Вы не  автор данной туду', HttpStatus.NOT_FOUND);
    }

    Object.assign(todo, updateTodoDTO);

    return await this.todoRepository.save(todo);
  }

  async deleteTodo(
    currentTodoID: number,
    currentUserId: number,
  ): Promise<{ message: string }> {
    const todo = await this.todoRepository.findOne({
      where: { id: currentTodoID },
    });

    if (!todo) {
      throw new HttpException('Туду не была найдена', HttpStatus.NOT_FOUND);
    }

    if (todo.user.id !== currentUserId) {
      throw new HttpException(
        'Вы не владелец данной туду',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.todoRepository.delete(todo);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return { message: 'Туду была удалена' };
  }

  toBoolean(value: string): boolean {
    if (value === 'true') {
      return true;
    } else if (value === 'false') {
      return false;
    } else {
      return false;
    }
  }
}
