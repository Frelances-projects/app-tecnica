import { Injectable } from '@nestjs/common'

import { School } from '../../../../application/entities/school'
import { SchoolRepository } from '../../../../application/repositories/school-repository'
import { PrismaService } from '../prisma.service'
import { PrismaSchoolMapper } from '../mappers/prisma-school-mapper'

@Injectable()
export class PrismaSchoolRepository implements SchoolRepository {
  constructor(private prisma: PrismaService) {}

  async create(school: School): Promise<void> {
    const raw = PrismaSchoolMapper.toPrisma(school)

    await this.prisma.school.create({ data: raw })
  }

  async findById(schoolId: string): Promise<School> {
    const school = await this.prisma.school.findUnique({
      where: { id: schoolId },
      include: { driverLicenseCategories: true },
    })

    if (!school) {
      return null
    }

    return PrismaSchoolMapper.toDomain(school)
  }

  async findMany(): Promise<School[]> {
    const school = await this.prisma.school.findMany({
      include: { driverLicenseCategories: true },
    })

    const schoolToDomain = school.map((school) =>
      PrismaSchoolMapper.toDomain(school),
    )

    return schoolToDomain
  }
}
