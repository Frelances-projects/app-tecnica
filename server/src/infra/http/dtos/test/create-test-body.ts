import { IsNotEmpty } from 'class-validator'

export class CreateTestBody {
  @IsNotEmpty()
  testDate: string

  @IsNotEmpty()
  testHour: string

  @IsNotEmpty()
  status: 'APPROVED' | 'DISAPPROVED' | 'MARKED'

  @IsNotEmpty()
  category: 'THEORETICAL' | 'PRACTICAL'
}
