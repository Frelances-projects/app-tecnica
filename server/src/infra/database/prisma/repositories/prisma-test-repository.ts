import { Injectable } from '@nestjs/common'

import { TestRepository } from 'src/application/repositories/tests-repository'
import { PrismaService } from '../prisma.service'
import { Test } from 'src/application/entities/tests'
import { PrismaTestMapper } from '../mappers/prisma-test-mapper'

@Injectable()
export class PrismaTestRepository implements TestRepository {
  constructor(private prisma: PrismaService) {}

  async create(test: Test): Promise<void> {
    const raw = PrismaTestMapper.toPrisma(test)

    await this.prisma.test.create({ data: raw })
  }

  async findById(testId: string): Promise<Test> {
    const test = await this.prisma.test.findUnique({
      where: { id: testId },
    })

    if (!test) return null

    return PrismaTestMapper.toDomain(test)
  }

  async findMany(): Promise<Test[]> {
    const test = await this.prisma.test.findMany({
      include: {
        student: {
          include: {
            school: {
              include: {
                users: {
                  select: {
                    id: true,
                    schoolId: true,
                    name: true,
                    function: true,
                  },
                },
              },
            },
          },
        },
        instructor: true,
      },
    })

    const testToDomain = test.map((test) => PrismaTestMapper.toDomain(test))

    return testToDomain
  }

  async findManyByStudent(studentId: string): Promise<Test[]> {
    const test = await this.prisma.test.findMany({
      where: { studentId },
      include: { instructor: true },
    })

    const testToDomain = test.map((test) => PrismaTestMapper.toDomain(test))

    return testToDomain
  }

  async findManyBySchool(schoolId: string): Promise<Test[]> {
    const test = await this.prisma.test.findMany({
      where: { student: { schoolId } },
      include: {
        student: {
          include: {
            school: {
              include: {
                users: {
                  select: {
                    id: true,
                    schoolId: true,
                    name: true,
                    function: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    const testToDomain = test.map((test) => PrismaTestMapper.toDomain(test))

    return testToDomain
  }

  async findManyByCategory(
    category: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<Test[]> {
    const test = await this.prisma.test.findMany({
      where: { category },
      include: {
        student: {
          include: {
            school: {
              include: {
                users: {
                  select: {
                    id: true,
                    schoolId: true,
                    name: true,
                    function: true,
                  },
                },
              },
            },
          },
        },
        instructor: true,
      },
    })

    const testToDomain = test.map((test) => PrismaTestMapper.toDomain(test))

    return testToDomain
  }

  async findManyBySchoolAndCategory(
    schoolId: string,
    category: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<Test[]> {
    const test = await this.prisma.test.findMany({
      where: { category, student: { schoolId } },
      include: {
        student: {
          include: {
            school: {
              include: {
                users: {
                  select: {
                    id: true,
                    schoolId: true,
                    name: true,
                    function: true,
                  },
                },
              },
            },
          },
        },
        instructor: true,
      },
    })

    const testToDomain = test.map((test) => PrismaTestMapper.toDomain(test))

    return testToDomain
  }

  async save(test: Test): Promise<void> {
    const raw = PrismaTestMapper.toPrisma(test)

    await this.prisma.test.update({
      where: { id: raw.id },
      data: raw,
    })
  }

  async delete(testId: string): Promise<void> {
    await this.prisma.test.delete({ where: { id: testId } })
  }
}
