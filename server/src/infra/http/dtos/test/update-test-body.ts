import { IsString } from 'class-validator'

export class UpdateTestBody {
  @IsString()
  testDate: string

  @IsString()
  testHour: string

  place?: string

  @IsString()
  status: 'APPROVED' | 'DISAPPROVED' | 'MARKED'

  instructorId?: string
}
