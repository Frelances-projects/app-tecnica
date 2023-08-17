import { IsNotEmpty, IsUrl } from 'class-validator'

export class CreateCalendarBody {
  @IsNotEmpty()
  date: string

  @IsNotEmpty()
  @IsUrl()
  fileUrl: string
}
