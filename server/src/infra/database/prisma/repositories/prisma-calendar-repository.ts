import { Injectable } from '@nestjs/common'

import { Calendar } from '../../../../application/entities/calendar'
import { CalendarRepository } from '../../../../application/repositories/calendar-repository'
import { PrismaService } from '../prisma.service'
import { PrismaCalendarMapper } from '../mappers/prisma-calendar-mapper'

@Injectable()
export class PrismaCalendarRepository implements CalendarRepository {
  constructor(private prisma: PrismaService) {}

  async create(calendar: Calendar): Promise<void> {
    const raw = PrismaCalendarMapper.toPrisma(calendar)

    await this.prisma.calendar.upsert({
      where: { schoolId: raw.schoolId },
      update: { schoolId: raw.schoolId, fileUrl: raw.fileUrl },
      create: raw,
    })
  }

  async findById(calendarId: string): Promise<Calendar> {
    const calendar = await this.prisma.calendar.findUnique({
      where: { id: calendarId },
    })

    if (!calendar) {
      return null
    }

    return PrismaCalendarMapper.toDomain(calendar)
  }

  async findBySchool(schoolId: string): Promise<Calendar> {
    const calendar = await this.prisma.calendar.findUnique({
      where: { schoolId },
    })

    if (!calendar) {
      return null
    }

    return PrismaCalendarMapper.toDomain(calendar)
  }

  async findMany(): Promise<Calendar[]> {
    const calendar = await this.prisma.calendar.findMany()

    const calendarToDomain = calendar.map((calendar) =>
      PrismaCalendarMapper.toDomain(calendar),
    )

    return calendarToDomain
  }

  async save(calendar: Calendar): Promise<void> {
    const raw = PrismaCalendarMapper.toPrisma(calendar)

    await this.prisma.calendar.update({
      where: {
        id: raw.id,
      },
      data: raw,
    })
  }
}
