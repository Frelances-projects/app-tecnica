import { Student } from "./student"

export interface Test {
  id: string
  category: 'THEORETICAL' | 'PRACTICAL'
  status: 'APPROVED' | 'DISAPPROVED' | 'MARKED'
  studentId: string
  testDate: string
  testDateNotFormatted?: string
  testHour: string
  student: Student;
}