import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { PrismaScheduledClassMapper } from '../mappers/prisma-scheduled-class-mapper'

import { ScheduledClass } from '../../../../application/entities/scheduled-class'
import { ScheduledClassRepository } from '../../../../application/repositories/scheduled-class-repository'

@Injectable()
export class PrismaScheduledClassRepository
  implements ScheduledClassRepository
{
  constructor(private prisma: PrismaService) {}

  async create(scheduledClass: ScheduledClass): Promise<void> {
    const raw = PrismaScheduledClassMapper.toPrisma(scheduledClass)

    await this.prisma.scheduledClass.create({ data: raw })
  }

  async findById(scheduledClassId: string): Promise<ScheduledClass> {
    const scheduledClass = await this.prisma.scheduledClass.findUnique({
      where: { id: scheduledClassId },
    })

    if (!scheduledClass) {
      return null
    }

    return PrismaScheduledClassMapper.toDomain(scheduledClass)
  }

  async findMany(): Promise<ScheduledClass[]> {
    const scheduledClass = await this.prisma.scheduledClass.findMany()

    const scheduledClassesToDomain = scheduledClass.map((scheduledClass) =>
      PrismaScheduledClassMapper.toDomain(scheduledClass),
    )

    return scheduledClassesToDomain
  }

  async findManyByStudentId(studentId: string): Promise<ScheduledClass[]> {
    const scheduledClass = await this.prisma.scheduledClass.findMany({
      where: { studentId },
    })

    const scheduledClassesToDomain = scheduledClass.map((scheduledClass) =>
      PrismaScheduledClassMapper.toDomain(scheduledClass),
    )

    return scheduledClassesToDomain
  }

  async findManyByClassId(classId: string): Promise<ScheduledClass[]> {
    const scheduledClass = await this.prisma.scheduledClass.findMany({
      where: { classId },
    })

    const scheduledClassesToDomain = scheduledClass.map((scheduledClass) =>
      PrismaScheduledClassMapper.toDomain(scheduledClass),
    )

    return scheduledClassesToDomain
  }

  async save(scheduledClass: ScheduledClass): Promise<void> {
    const raw = PrismaScheduledClassMapper.toPrisma(scheduledClass)

    await this.prisma.scheduledClass.update({
      where: { id: raw.id },
      data: raw,
    })
  }
}
