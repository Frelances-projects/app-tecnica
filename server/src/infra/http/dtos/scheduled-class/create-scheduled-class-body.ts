import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateScheduledClassBody {
  schedulingDate: string

  schedulingHour: string

  status: 'PENDING' | 'UNCHECKED' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'

  @IsNotEmpty()
  @IsUUID()
  studentId: string

  @IsNotEmpty()
  @IsUUID()
  classId: string

  vehicle?: string

  instructorId?: string
}
