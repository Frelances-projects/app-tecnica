import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { PrismaClassMapper } from '../mappers/prisma-class-mapper'

import { Class } from '../../../../application/entities/class'
import { ClassRepository } from '../../../../application/repositories/class-repository'

@Injectable()
export class PrismaClassRepository implements ClassRepository {
  constructor(private prisma: PrismaService) {}

  async create(lesson: Class): Promise<void> {
    const raw = PrismaClassMapper.toPrisma(lesson)

    await this.prisma.class.create({ data: raw })
  }

  async findById(classId: string): Promise<Class> {
    const lesson = await this.prisma.class.findUnique({
      where: { id: classId },
    })

    if (!lesson) {
      return null
    }

    return PrismaClassMapper.toDomain(lesson)
  }

  async findByName(className: string): Promise<Class> {
    const lesson = await this.prisma.class.findFirst({
      where: { name: { equals: className, mode: 'insensitive' } },
    })

    if (!lesson) {
      return null
    }

    return PrismaClassMapper.toDomain(lesson)
  }

  async findByCode(code: number): Promise<Class> {
    const lesson = await this.prisma.class.findUnique({
      where: { code },
    })

    if (!lesson) {
      return null
    }

    return PrismaClassMapper.toDomain(lesson)
  }

  async findMany(): Promise<Class[]> {
    const lessons = await this.prisma.class.findMany()

    const classToDomain = lessons.map((lesson) =>
      PrismaClassMapper.toDomain(lesson),
    )

    return classToDomain
  }

  async findManyByCategory(
    category: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<Class[]> {
    const lessons = await this.prisma.class.findMany({ where: { category } })

    const classToDomain = lessons.map((lesson) =>
      PrismaClassMapper.toDomain(lesson),
    )

    return classToDomain
  }

  async findManyByCategoryAndStudent(
    category: 'THEORETICAL' | 'PRACTICAL',
    studentId: string,
  ): Promise<Class[]> {
    const lessons = await this.prisma.class.findMany({
      where: { category },
      include: { scheduledClass: { where: { studentId } } },
    })

    const classToDomain = lessons.map((lesson) =>
      PrismaClassMapper.toDomain(lesson),
    )

    return classToDomain
  }

  async save(lesson: Class): Promise<void> {
    const raw = PrismaClassMapper.toPrisma(lesson)

    await this.prisma.class.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }

  async delete(classId: string): Promise<void> {
    await this.prisma.class.delete({ where: { id: classId } })
  }
}
