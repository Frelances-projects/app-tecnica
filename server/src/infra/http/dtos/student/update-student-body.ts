import { Length, IsEmail, IsNumber, IsString } from 'class-validator'

export class UpdateStudentBody {
  @IsString()
  name: string

  @Length(5, 300)
  @IsEmail()
  email: string

  @IsString()
  schoolId: string

  @IsString()
  enrolledAt: string

  @IsNumber()
  number: number
}
