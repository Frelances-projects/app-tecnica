import { User as RawUser } from '@prisma/client'

import { User } from '../../../../application/entities/user'

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      schoolId: user.schoolId,
      function: user.userFunction,
      token: user.token,
      imtId: user.imtId,
      createdAt: user.createdAt,
    }
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        schoolId: raw.schoolId,
        function: raw.function,
        token: raw.token,
        imtId: raw.imtId,
        createdAt: raw.createdAt,
        ...raw,
      },
      raw.id,
    )
  }
}
