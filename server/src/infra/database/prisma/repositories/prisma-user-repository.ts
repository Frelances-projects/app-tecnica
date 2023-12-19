import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { PrismaUserMapper } from '../mappers/prisma-user-mapper'

import { User } from '../../../../application/entities/user'
import { UserRepository } from '../../../../application/repositories/user-repository'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.create({ data: raw })
  }

  async findById(studentId: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: studentId },
      include: { school: true },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return PrismaUserMapper.toDomain(user)
  }

  async findMany(): Promise<User[]> {
    const users = await this.prisma.user.findMany({ include: { school: true } })

    const usersToDomain = users.map((user) => PrismaUserMapper.toDomain(user))

    return usersToDomain
  }

  async findManyBySchool(schoolId: string): Promise<User[]> {
    const users = await this.prisma.user.findMany({ where: { schoolId } })

    const usersToDomain = users.map((user) => PrismaUserMapper.toDomain(user))

    return usersToDomain
  }

  async save(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user)

    await this.prisma.user.update({ where: { id: raw.id }, data: raw })
  }

  async delete(userId: string): Promise<void> {
    await this.prisma.user.delete({ where: { id: userId } })
  }
}
