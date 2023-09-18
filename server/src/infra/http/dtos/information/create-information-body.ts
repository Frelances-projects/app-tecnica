import { IsNotEmpty, Length, IsUUID } from 'class-validator'

export class CreateInformationBody {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @Length(5, 460)
  description: string

  @IsNotEmpty()
  date: string

  @IsNotEmpty()
  @IsUUID()
  schoolId: string
}
