import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateScheduledClassBody {
  schedulingDate: string

  schedulingHour: string

  @IsNotEmpty()
  @IsUUID()
  studentId: string

  @IsNotEmpty()
  @IsUUID()
  classId: string
}
