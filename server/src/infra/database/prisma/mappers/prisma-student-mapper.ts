import { Student as RawStudent } from '@prisma/client'

import { Student } from '../../../../application/entities/student'

export class PrismaStudentMapper {
  static toPrisma(student: Student) {
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      password: student.password,
      schoolId: student.schoolId,
      paymentId: student.paymentId,
      driverLicenseCategoryId: student.driverLicenseCategoryId,
      number: student.number,
      token: student.token,
      enrolledAt: student.enrolledAt,
      createdAt: student.createdAt,
    }
  }

  static toDomain(raw: RawStudent): Student {
    return new Student(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        schoolId: raw.schoolId,
        paymentId: raw.paymentId,
        driverLicenseCategoryId: raw.driverLicenseCategoryId,
        number: raw.number,
        token: raw.token,
        enrolledAt: raw.enrolledAt,
        createdAt: raw.createdAt,
        ...raw,
      },
      raw.id,
    )
  }
}
