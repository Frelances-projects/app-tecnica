import { Test as RawTest } from '@prisma/client'

import { Test } from 'src/application/entities/tests'

export class PrismaTestMapper {
  static toPrisma(test: Test) {
    return {
      id: test.id,
      category: test.category,
      status: test.status,
      testDate: test.testDate,
      testHour: test.testHour,
      place: test.place,
      studentId: test.studentId,
      instructorId: test.instructorId,
      createdAt: test.createdAt,
    }
  }

  static toDomain(raw: RawTest): Test {
    return new Test(
      {
        category: raw.category,
        status: raw.status,
        testDate: raw.testDate,
        testHour: raw.testHour,
        place: raw.place,
        studentId: raw.studentId,
        instructorId: raw.instructorId,
        createdAt: raw.createdAt,
        ...raw,
      },
      raw.id,
    )
  }
}
