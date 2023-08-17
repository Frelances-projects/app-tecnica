import { IsNotEmpty, Length } from 'class-validator'

export class CreateInformationBody {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @Length(5, 460)
  description: string

  @IsNotEmpty()
  date: string
}
