import { Injectable } from '@nestjs/common'

import { Student } from '../../../../application/entities/student'
import { StudentsRepository } from '../../../../application/repositories/students-repository'
import { PrismaService } from '../prisma.service'
import { PrismaStudentMapper } from '../mappers/prisma-student-mapper'

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(student: Student): Promise<void> {
    const raw = PrismaStudentMapper.toPrisma(student)

    await this.prisma.student.create({ data: raw })
  }

  async findById(studentId: string): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
      include: { payment: true, school: true, tests: true },
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async findByEmail(email: string): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: { email },
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async findByNumber(number: number): Promise<Student> {
    const student = await this.prisma.student.findUnique({
      where: { number },
    })

    if (!student) {
      return null
    }

    return PrismaStudentMapper.toDomain(student)
  }

  async findMany(): Promise<Student[]> {
    const students = await this.prisma.student.findMany({
      include: {
        school: {
          include: {
            users: {
              select: {
                email: true,
                id: true,
                schoolId: true,
                name: true,
                function: true,
              },
            },
          },
        },
        driverLicenseCategory: true,
        scheduledClass: { include: { class: true } },
      },
    })

    const studentsToDomain = students.map((student) =>
      PrismaStudentMapper.toDomain(student),
    )

    return studentsToDomain
  }

  async findManyBySchool(schoolId: string): Promise<Student[]> {
    const students = await this.prisma.student.findMany({
      where: { schoolId },
      include: {
        school: {
          include: {
            users: {
              select: {
                email: true,
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
    })

    const studentsToDomain = students.map((student) =>
      PrismaStudentMapper.toDomain(student),
    )

    return studentsToDomain
  }

  async save(student: Student): Promise<void> {
    const raw = PrismaStudentMapper.toPrisma(student)

    await this.prisma.student.update({ where: { id: raw.id }, data: raw })
  }

  async delete(studentId: string): Promise<void> {
    await this.prisma.student.delete({ where: { id: studentId } })
  }
}
