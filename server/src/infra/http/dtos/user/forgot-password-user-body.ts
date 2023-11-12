import { IsNotEmpty, Length, IsEmail } from 'class-validator'

export class ForgotUserPasswordBody {
  @IsNotEmpty()
  @Length(5, 300)
  @IsEmail()
  email: string

  @IsNotEmpty()
  link: string
}
