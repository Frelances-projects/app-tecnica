import {
  IsNotEmpty,
  Length,
  IsEmail,
  IsStrongPassword,
  IsUUID,
} from 'class-validator'

export class CreateUserBody {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @Length(5, 300)
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
  })
  password: string

  @IsNotEmpty()
  @IsUUID()
  schoolId: string

  @IsNotEmpty()
  function: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'

  imtId?: string
}
