import { IsNotEmpty, Length, IsEmail, IsStrongPassword } from 'class-validator'

export class CreateUserSessionBody {
  @IsNotEmpty()
  @Length(5, 300)
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
  })
  password: string
}
