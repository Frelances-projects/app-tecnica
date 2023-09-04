import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateScheduledClassBody {
  schedulingDate: string

  schedulingHour: string

  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'

  @IsNotEmpty()
  @IsUUID()
  studentId: string

  @IsNotEmpty()
  @IsUUID()
  classId: string
}
