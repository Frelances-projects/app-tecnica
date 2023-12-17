import { Injectable } from '@nestjs/common'

import { Group } from '../../../../application/entities/group'
import { GroupsRepository } from '../../../../application/repositories/groups-repository'

import { PrismaService } from '../prisma.service'
import { PrismaGroupMapper } from '../mappers/prisma-group-mapper'

@Injectable()
export class PrismaGroupsRepository implements GroupsRepository {
  constructor(private prisma: PrismaService) {}

  async create(group: Group): Promise<void> {
    const raw = PrismaGroupMapper.toPrisma(group)

    await this.prisma.group.create({ data: raw })
  }

  async findById(groupId: string): Promise<Group> {
    const group = await this.prisma.group.findUnique({
      where: { id: groupId },
    })

    if (!group) {
      return null
    }

    return PrismaGroupMapper.toDomain(group)
  }

  async findByName(groupName: string): Promise<Group> {
    const group = await this.prisma.group.findFirst({
      where: { name: { contains: groupName, mode: 'insensitive' } },
      include: { schools: { include: { driverLicenseCategories: true } } },
    })

    if (!group) {
      return null
    }

    return PrismaGroupMapper.toDomain(group)
  }

  async findMany(): Promise<Group[]> {
    const groups = await this.prisma.group.findMany()

    const schoolToDomain = groups.map((group) =>
      PrismaGroupMapper.toDomain(group),
    )

    return schoolToDomain
  }
}
