import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { PrismaScheduledClassMapper } from '../mappers/prisma-scheduled-class-mapper'

import { ScheduledClass } from '../../../../application/entities/scheduled-class'
import {
  PaginationParams,
  ScheduledClassRepository,
  ScheduledClassResponse,
} from '../../../../application/repositories/scheduled-class-repository'
import { Prisma } from '@prisma/client'

@Injectable()
export class PrismaScheduledClassRepository
  implements ScheduledClassRepository
{
  constructor(private prisma: PrismaService) {}

  async create(scheduledClass: ScheduledClass): Promise<void> {
    const raw = PrismaScheduledClassMapper.toPrisma(scheduledClass)

    await this.prisma.scheduledClass.create({ data: raw })
  }

  async createMany(scheduledClasses: ScheduledClass[]): Promise<void> {
    const raws = scheduledClasses.map((scheduledClass) =>
      PrismaScheduledClassMapper.toPrisma(scheduledClass),
    )

    await this.prisma.scheduledClass.createMany({ data: raws })
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
    const scheduledClass = await this.prisma.scheduledClass.findMany({
      include: {
        class: true,
        instructor: true,
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
            driverLicenseCategory: true,
          },
        },
      },
    })

    const scheduledClassesToDomain = scheduledClass.map((scheduledClass) =>
      PrismaScheduledClassMapper.toDomain(scheduledClass),
    )

    return scheduledClassesToDomain
  }

  async findManyBySchoolId(schoolId: string): Promise<ScheduledClass[]> {
    const scheduledClass = await this.prisma.scheduledClass.findMany({
      where: { student: { schoolId } },
      include: {
        class: true,
        instructor: true,
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
            driverLicenseCategory: true,
          },
        },
      },
    })

    const scheduledClassesToDomain = scheduledClass.map((scheduledClass) =>
      PrismaScheduledClassMapper.toDomain(scheduledClass),
    )

    return scheduledClassesToDomain
  }

  async findManyByCategoryClass(
    categoryClass: 'THEORETICAL' | 'PRACTICAL',
    { page, studentName, studentNumber, schedulingDate }: PaginationParams,
  ): Promise<ScheduledClassResponse> {
    if (page) {
      const filters: Prisma.ScheduledClassWhereInput = {
        class: { category: categoryClass },
      }

      if (studentName || studentNumber) {
        filters.student = {}

        if (studentName) {
          filters.student.name = {
            startsWith: studentName,
            mode: 'insensitive',
          }
        }

        if (studentNumber) {
          filters.student.number = Number(studentNumber)
        }
      }

      if (schedulingDate && schedulingDate !== 'all') {
        const formattedDate = schedulingDate.split('T')[0] // Considera apenas a parte YYYY-MM-DD da data
        filters.schedulingDate = {
          contains: formattedDate,
        }
      }

      const query: Prisma.ScheduledClassFindManyArgs = {
        where: filters,
        orderBy: {
          schedulingDate: { sort: 'desc', nulls: 'last' },
        },
        take: 10,
        skip: (page - 1) * 10,
        include: {
          class: true,
          instructor: true,
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
              driverLicenseCategory: true,
            },
          },
        },
      }

      const [scheduledClass, count] = await this.prisma.$transaction([
        this.prisma.scheduledClass.findMany(query),
        this.prisma.scheduledClass.count({ where: query.where }),
      ])

      const scheduledClassesToDomain = scheduledClass.map((scheduledClass) =>
        PrismaScheduledClassMapper.toDomain(scheduledClass),
      )

      return { scheduledClasses: scheduledClassesToDomain, total: count }
    } else {
      const scheduledClass = await this.prisma.scheduledClass.findMany({
        where: { class: { category: categoryClass } },
        orderBy: {
          schedulingDate: { sort: 'desc', nulls: 'last' },
        },
        include: {
          class: true,
          instructor: true,
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
              driverLicenseCategory: true,
            },
          },
        },
      })

      const scheduledClassesToDomain = scheduledClass.map((scheduledClass) =>
        PrismaScheduledClassMapper.toDomain(scheduledClass),
      )

      return { scheduledClasses: scheduledClassesToDomain, total: 0 }
    }
  }

  async findManyBySchoolAndCategoryClass(
    schoolId: string,
    categoryClass: 'THEORETICAL' | 'PRACTICAL',
    { page, studentName, studentNumber, schedulingDate }: PaginationParams,
  ): Promise<ScheduledClassResponse> {
    if (page) {
      const filters: Prisma.ScheduledClassWhereInput = {
        student: { schoolId },
        class: { category: categoryClass },
      }

      if (studentName || studentNumber) {
        filters.student = { schoolId }

        if (studentName) {
          filters.student.name = {
            startsWith: studentName,
            mode: 'insensitive',
          }
        }

        if (studentNumber) {
          filters.student.number = Number(studentNumber)
        }
      }

      if (schedulingDate && schedulingDate !== 'all') {
        const formattedDate = schedulingDate.split('T')[0] // Considera apenas a parte YYYY-MM-DD da data
        filters.schedulingDate = {
          contains: formattedDate,
        }
      }

      const query: Prisma.ScheduledClassFindManyArgs = {
        where: filters,
        orderBy: {
          schedulingDate: { sort: 'desc', nulls: 'last' },
        },
        take: 10,
        skip: (page - 1) * 10,
        include: {
          class: true,
          instructor: true,
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
              driverLicenseCategory: true,
            },
          },
        },
      }

      const [scheduledClass, count] = await this.prisma.$transaction([
        this.prisma.scheduledClass.findMany(query),
        this.prisma.scheduledClass.count({ where: query.where }),
      ])

      const scheduledClassesToDomain = scheduledClass.map((scheduledClass) =>
        PrismaScheduledClassMapper.toDomain(scheduledClass),
      )

      return { scheduledClasses: scheduledClassesToDomain, total: count }
    } else {
      const scheduledClass = await this.prisma.scheduledClass.findMany({
        where: { student: { schoolId }, class: { category: categoryClass } },
        orderBy: {
          schedulingDate: { sort: 'desc', nulls: 'last' },
        },
        include: {
          class: true,
          instructor: true,
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
              driverLicenseCategory: true,
            },
          },
        },
      })

      const scheduledClassesToDomain = scheduledClass.map((scheduledClass) =>
        PrismaScheduledClassMapper.toDomain(scheduledClass),
      )

      return { scheduledClasses: scheduledClassesToDomain, total: 0 }
    }
  }

  async findManyByStudentAndCategoryClass(
    studentId: string,
    categoryClass: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<ScheduledClass[]> {
    const scheduledClass = await this.prisma.scheduledClass.findMany({
      where: { student: { id: studentId }, class: { category: categoryClass } },
      include: {
        class: true,
        instructor: true,
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
            driverLicenseCategory: true,
          },
        },
      },
    })

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

  async delete(scheduledClassId: string): Promise<void> {
    await this.prisma.scheduledClass.delete({ where: { id: scheduledClassId } })
  }
}
