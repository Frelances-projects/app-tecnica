export class UpdateScheduledClassBody {
  schedulingDate: string

  schedulingHour: string

  status: 'PENDING' | 'UNCHECKED' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'

  justification: string

  classId: string

  vehicle?: string

  instructorId?: string
}
