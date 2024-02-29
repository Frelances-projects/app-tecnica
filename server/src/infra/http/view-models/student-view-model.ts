import { Student } from '../../../application/entities/student'

export class StudentViewModel {
  static toHTTP(student: any) {
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      number: student.number,
      phone: student.phone,
      imtId: student.imtId,
      driverLicenseCategoryId: student.driverLicenseCategoryId,
      paymentId: student.paymentId,
      token: student.token,
      schoolId: student.schoolId,
      enrolledAt: student.enrolledAt,
      createdAt: student.createdAt,
      school: student.props.school,
      scheduledClass: student.props.scheduledClass,
      firebaseTokens: student.firebaseTokens,
      driverLicenseCategory: student.props.driverLicenseCategory,
    }
  }
}
