import { Length } from 'class-validator'

export class UpdateInformationBody {
  name: string

  @Length(5, 460)
  description: string

  date: string
}
