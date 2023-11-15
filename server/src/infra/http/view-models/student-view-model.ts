import { Student } from '../../../application/entities/student'

export class StudentViewModel {
  static toHTTP(student: any) {
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      number: student.number,
      driverLicenseCategoryId: student.driverLicenseCategoryId,
      paymentId: student.paymentId,
      token: student.token,
      schoolId: student.schoolId,
      enrolledAt: student.enrolledAt,
      createdAt: student.createdAt,
      school: student.props.school,
      firebaseTokens: student.firebaseTokens,
    }
  }
}
