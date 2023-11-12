import { IsNotEmpty, IsStrongPassword } from 'class-validator'

export class ResetUserPasswordBody {
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
  })
  newPassword: string
}
