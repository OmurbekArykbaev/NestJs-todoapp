import { TodosEntity } from 'src/todo/todos.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => TodosEntity, (todo) => todo.user)
  todos: TodosEntity[];
}
