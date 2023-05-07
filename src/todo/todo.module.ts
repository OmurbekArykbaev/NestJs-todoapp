import { Module } from '@nestjs/common';
import { TodoContorller } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosEntity } from './todos.entity';
import { UserEntity } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodosEntity, UserEntity])],
  providers: [TodoService],
  controllers: [TodoContorller],
  exports: [],
})
export class TodoModule {}
