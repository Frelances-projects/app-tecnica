import type { Student } from './student'
import type { User } from './user'

export interface Test {
  id: string
  category: 'THEORETICAL' | 'PRACTICAL'
  status: 'APPROVED' | 'DISAPPROVED' | 'MARKED'
  studentId: string
  testDate: string
  testDateNotFormatted?: string
  testHour: string
  instructorId?: string
  slug?: 'test'
  student: Student
  instructor: User
}
