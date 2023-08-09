import { Student as RawStudent } from '@prisma/client';

import { Student } from '../../../../application/entities/student';

export class PrismaStudentMapper {
  static toPrisma(student: Student) {
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      number: student.number,
      enrolledAt: student.enrolledAt,
      createdAt: student.createdAt,
    };
  }

  static toDomain(raw: RawStudent): Student {
    return new Student(
      {
        name: raw.name,
        email: raw.email,
        number: raw.number,
        enrolledAt: raw.enrolledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
