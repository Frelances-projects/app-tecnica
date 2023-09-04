import { IsNotEmpty, IsNumber } from 'class-validator'

export class CreateStudentSessionBody {
  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  @IsNumber()
  number: number
}
