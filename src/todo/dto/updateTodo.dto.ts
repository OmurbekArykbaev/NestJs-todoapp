import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateTodoDTO {
  @IsNotEmpty({ message: 'Заголовок задачи не может быть пустым' })
  @IsString({ message: 'Заголовок должен быть строкой' })
  readonly title: string;

  @IsNotEmpty({ message: 'Заголовок задачи не может быть пустым' })
  @IsBoolean({ message: 'Должен быть булеаном' })
  readonly isDone: boolean;
}
