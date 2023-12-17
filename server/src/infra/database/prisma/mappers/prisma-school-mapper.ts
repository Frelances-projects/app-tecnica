import { School as RawSchool } from '@prisma/client'

import { School } from '../../../../application/entities/school'

export class PrismaSchoolMapper {
  static toPrisma(school: School) {
    return {
      id: school.id,
      name: school.name,
      groupId: school.groupId,
      createdAt: school.createdAt,
    }
  }

  static toDomain(raw: RawSchool): School {
    return new School(
      {
        name: raw.name,
        groupId: raw.groupId,
        createdAt: raw.createdAt,
        ...raw,
      },
      raw.id,
    )
  }
}
