import { IsNotEmpty } from 'class-validator'

export class ResetStudentPasswordBody {
  @IsNotEmpty()
  newPassword: string
}
