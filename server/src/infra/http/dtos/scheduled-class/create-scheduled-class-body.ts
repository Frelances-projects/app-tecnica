import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateScheduledClassBody {
  @IsNotEmpty()
  schedulingDate: string

  @IsNotEmpty()
  schedulingHour: string

  @IsNotEmpty()
  @IsUUID()
  studentId: string

  @IsNotEmpty()
  @IsUUID()
  classId: string
}
