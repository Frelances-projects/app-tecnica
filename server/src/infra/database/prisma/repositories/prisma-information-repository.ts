import { Injectable } from '@nestjs/common'

import { Information } from '../../../../application/entities/information'
import { InformationRepository } from '../../../../application/repositories/information-repository'
import { PrismaService } from '../prisma.service'
import { PrismaInformationMapper } from '../mappers/prisma-information-mapper'

@Injectable()
export class PrismaInformationRepository implements InformationRepository {
  constructor(private prisma: PrismaService) {}

  async create(information: Information): Promise<void> {
    const raw = PrismaInformationMapper.toPrisma(information)

    await this.prisma.information.create({ data: raw })
  }

  async findById(informationId: string): Promise<Information> {
    const information = await this.prisma.information.findUnique({
      where: { id: informationId },
    })

    if (!information) {
      return null
    }

    return PrismaInformationMapper.toDomain(information)
  }

  async findMany(): Promise<Information[]> {
    const information = await this.prisma.information.findMany({
      include: { school: true },
    })

    const informationToDomain = information.map((info) =>
      PrismaInformationMapper.toDomain(info),
    )

    return informationToDomain
  }

  async findManyBySchool(schoolId: string): Promise<Information[]> {
    const information = await this.prisma.information.findMany({
      where: { schoolId },
      include: { school: true },
    })

    const informationToDomain = information.map((info) =>
      PrismaInformationMapper.toDomain(info),
    )

    return informationToDomain
  }

  async save(information: Information): Promise<void> {
    const raw = PrismaInformationMapper.toPrisma(information)

    await this.prisma.information.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }

  async delete(informationId: string): Promise<void> {
    await this.prisma.information.delete({
      where: {
        id: informationId,
      },
    })
  }
}
