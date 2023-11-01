import { IsNotEmpty, Length } from 'class-validator'

export class CreateClassBody {
  @IsNotEmpty()
  name: string

  @Length(5, 460)
  description: string

  @IsNotEmpty()
  category: 'THEORETICAL' | 'PRACTICAL'

  code?: number
}
