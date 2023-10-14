import { Information as RawInformation } from '@prisma/client'

import { Information } from '../../../../application/entities/information'

export class PrismaInformationMapper {
  static toPrisma(information: Information) {
    return {
      id: information.id,
      name: information.name,
      description: information.description,
      date: information.date,
      schoolId: information.schoolId,
      createdAt: information.createdAt,
    }
  }

  static toDomain(raw: RawInformation): Information {
    return new Information(
      {
        name: raw.name,
        description: raw.description,
        date: raw.date,
        schoolId: raw.schoolId,
        createdAt: raw.createdAt,
        ...raw,
      },
      raw.id,
    )
  }
}
