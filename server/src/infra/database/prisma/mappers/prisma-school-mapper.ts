import { School as RawSchool } from '@prisma/client'

import { School } from '../../../../application/entities/school'

export class PrismaSchoolMapper {
  static toPrisma(school: School) {
    return {
      id: school.id,
      name: school.name,
      createdAt: school.createdAt,
    }
  }

  static toDomain(raw: RawSchool): School {
    return new School(
      {
        name: raw.name,
        createdAt: raw.createdAt,
      },
      raw.id,
    )
  }
}
