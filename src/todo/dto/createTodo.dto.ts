import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { Status } from '../todo.interface';

export class CreateTodoDTO {
  @IsNotEmpty({ message: 'Заголовок задачи не может быть пустым' })
  @IsString({ message: 'Заголовок должен быть строкой' })
  // @MinLength(3, {
  //   message: 'Заголовок не меньше 10 символов',
  // })
  // @MaxLength(50, {
  //   message: 'Заголовок слишком длинный',
  // })
  readonly title: string;

  @IsNotEmpty({ message: 'Заголовок задачи не может быть пустым' })
  @IsBoolean({ message: 'Должен быть булеаном' })
  readonly isDone: boolean;

  // @IsNotEmpty({ message: 'Статус не выставлен' })
  // @IsEnum(Status, {
  //   message: `Статус должен быть ${Status.CREATED} или ${Status.FINISHED}`,
  // })
  readonly status: Status;
}
