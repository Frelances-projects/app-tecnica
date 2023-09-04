import { Class as RawClass } from '@prisma/client'

import { Class } from '../../../../application/entities/class'

export class PrismaClassMapper {
  static toPrisma(lesson: Class) {
    return {
      id: lesson.id,
      name: lesson.name,
      description: lesson.description,
      code: lesson.code,
      category: lesson.category,
      createdAt: lesson.createdAt,
    }
  }

  static toDomain(raw: RawClass): Class {
    return new Class(
      {
        name: raw.name,
        description: raw.description,
        code: raw.code,
        category: raw.category,
        createdAt: raw.createdAt,
        ...raw,
      },
      raw.id,
    )
  }
}
