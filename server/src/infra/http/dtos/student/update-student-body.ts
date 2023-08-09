import { Length, IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateStudentBody {
  @IsString()
  name: string;

  @Length(5, 300)
  @IsEmail()
  email: string;

  @IsNumber()
  number: number;
}
