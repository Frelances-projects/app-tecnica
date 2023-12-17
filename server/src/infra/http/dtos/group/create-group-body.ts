import { IsNotEmpty } from 'class-validator'

export class CreateGroupBody {
  @IsNotEmpty()
  name: string
}
