import { Length, IsEmail, IsUUID } from 'class-validator'

export class UpdateUserBody {
  name: string

  @Length(5, 300)
  @IsEmail()
  email: string

  @IsUUID()
  schoolId: string

  imtId?: string
}
