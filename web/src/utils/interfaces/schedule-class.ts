import { Class } from './class'
import { Student } from './student'
import { User } from './user'

export interface ScheduleClass {
  id: string
  schedulingDate?: string
  schedulingDateNotFormatted?: string
  schedulingHour?: string
  justification?: string
  vehicle?: string
  status:
    | 'PENDING'
    | 'UNCHECKED'
    | 'CONFIRMED'
    | 'CANCELED'
    | 'COMPLETED'
    | 'MISSED'
  studentId: string
  classId: string
  instructorId?: string
  class: Class
  student: Student
  instructor: User
  slug?: 'scheduled-class'
}
