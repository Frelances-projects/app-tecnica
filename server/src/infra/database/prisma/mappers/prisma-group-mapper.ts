import { Group as RawGroup } from '@prisma/client'

import { Group } from '../../../../application/entities/group'

export class PrismaGroupMapper {
  static toPrisma(group: Group) {
    return {
      id: group.id,
      name: group.name,
      createdAt: group.createdAt,
    }
  }

  static toDomain(raw: RawGroup): Group {
    return new Group(
      {
        name: raw.name,
        createdAt: raw.createdAt,
        ...raw,
      },
      raw.id,
    )
  }
}
