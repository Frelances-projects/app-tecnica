import { IsNotEmpty } from 'class-validator'

export class CreateSchoolBody {
  @IsNotEmpty()
  name: string
}
