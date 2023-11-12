import { IsNotEmpty, Length, IsEmail } from 'class-validator'

export class ForgotStudentPasswordBody {
  @IsNotEmpty()
  @Length(5, 300)
  @IsEmail()
  email: string

  @IsNotEmpty()
  link: string
}
