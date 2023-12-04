import { IsUUID } from 'class-validator'

export class UpdateScheduledClassBody {
  schedulingDate: string

  schedulingHour: string

  status: 'PENDING' | 'UNCHECKED' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'

  @IsUUID()
  classId: string
}
