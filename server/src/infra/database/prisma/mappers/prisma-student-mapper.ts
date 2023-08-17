import { Student as RawStudent } from '@prisma/client'

import { Student } from '../../../../application/entities/student'

export class PrismaStudentMapper {
  static toPrisma(student: Student) {
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      schoolId: student.schoolId,
      paymentId: student.paymentId,
      driverLicenseCategory: student.driverLicenseCategory,
      number: student.number,
      enrolledAt: student.enrolledAt,
      createdAt: student.createdAt,
    }
  }

  static toDomain(raw: RawStudent): Student {
    return new Student(
      {
        name: raw.name,
        email: raw.email,
        schoolId: raw.schoolId,
        paymentId: raw.paymentId,
        driverLicenseCategory: raw.driverLicenseCategory,
        number: raw.number,
        enrolledAt: raw.enrolledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    )
  }
}
