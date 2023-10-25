import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { PrismaDriverLicenseCategoryMapper } from '../mappers/prisma-driver-license-category-mapper'

import { DriverLicenseCategory } from '../../../../application/entities/driver-license-category'
import { DriverLicenseCategoryRepository } from '../../../../application/repositories/driver-license-category-repository'

@Injectable()
export class PrismaDriverLicenseCategoryRepository
  implements DriverLicenseCategoryRepository
{
  constructor(private prisma: PrismaService) {}

  async create(driverLicenseCategory: DriverLicenseCategory): Promise<void> {
    const raw = PrismaDriverLicenseCategoryMapper.toPrisma(
      driverLicenseCategory,
    )

    await this.prisma.driverLicenseCategory.create({ data: raw as any })
  }

  async findById(
    driverLicenseCategoryId: string,
  ): Promise<DriverLicenseCategory> {
    const driverLicenseCategory =
      await this.prisma.driverLicenseCategory.findUnique({
        where: { id: driverLicenseCategoryId },
      })

    if (!driverLicenseCategory) {
      return null
    }

    return PrismaDriverLicenseCategoryMapper.toDomain(driverLicenseCategory)
  }

  async findMany(): Promise<DriverLicenseCategory[]> {
    const lessons = await this.prisma.driverLicenseCategory.findMany({
      include: { school: true },
    })

    const driverLicenseCategoriesToDomain = lessons.map((lesson) =>
      PrismaDriverLicenseCategoryMapper.toDomain(lesson),
    )

    return driverLicenseCategoriesToDomain
  }

  async findManyBySchool(schoolId: string): Promise<DriverLicenseCategory[]> {
    const driverLicenseCategories =
      await this.prisma.driverLicenseCategory.findMany({
        where: { schoolId },
        include: { school: true },
      })

    const driverLicenseCategoriesToDomain = driverLicenseCategories.map(
      (driverLicenseCategory) =>
        PrismaDriverLicenseCategoryMapper.toDomain(driverLicenseCategory),
    )

    return driverLicenseCategoriesToDomain
  }

  async save(driverLicenseCategory: DriverLicenseCategory): Promise<void> {
    const raw = PrismaDriverLicenseCategoryMapper.toPrisma(
      driverLicenseCategory,
    )

    await this.prisma.driverLicenseCategory.update({
      where: {
        id: raw.id,
      },
      data: raw as any,
    })
  }

  async delete(driverLicenseCategoryId: string): Promise<void> {
    await this.prisma.driverLicenseCategory.delete({
      where: { id: driverLicenseCategoryId },
    })
  }
}
