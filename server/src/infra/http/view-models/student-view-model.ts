import { Student } from '../../../application/entities/student'

export class StudentViewModel {
  static toHTTP(student: Student) {
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      number: student.number,
      enrolledAt: student.enrolledAt,
      createdAt: student.createdAt,
    }
  }
}
