import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreatePracticalScheduledClassBody {
  @IsNotEmpty()
  schedulingDate: string

  @IsNotEmpty()
  schedulingHour: string

  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'

  @IsNotEmpty()
  @IsUUID()
  studentId: string

  @IsNotEmpty()
  className: string

  classDescription: string
}