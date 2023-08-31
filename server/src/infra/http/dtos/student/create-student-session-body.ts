import { IsNotEmpty, IsNumber, IsStrongPassword } from 'class-validator'

export class CreateStudentSessionBody {
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
  })
  password: string

  @IsNotEmpty()
  @IsNumber()
  number: number
}
