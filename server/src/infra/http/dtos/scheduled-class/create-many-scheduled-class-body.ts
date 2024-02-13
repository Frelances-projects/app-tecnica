import { IsNotEmpty, IsUUID } from 'class-validator'

export class CreateManyScheduledClassBody {
  totalClasses: number

  @IsNotEmpty()
  @IsUUID()
  studentId: string

  vehicle?: string

  instructorId?: string
}
