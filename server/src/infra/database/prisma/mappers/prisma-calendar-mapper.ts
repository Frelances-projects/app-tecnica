import { Calendar as RawCalendar } from '@prisma/client'

import { Calendar } from '../../../../application/entities/calendar'

export class PrismaCalendarMapper {
  static toPrisma(calendar: Calendar) {
    return {
      id: calendar.id,
      schoolId: calendar.schoolId,
      fileUrl: calendar.fileUrl,
      createdAt: calendar.createdAt,
    }
  }

  static toDomain(raw: RawCalendar): Calendar {
    return new Calendar(
      {
        schoolId: raw.schoolId,
        fileUrl: raw.fileUrl,
        createdAt: raw.createdAt,
      },
      raw.id,
    )
  }
}
