import { Calendar as RawCalendar } from "@prisma/client";

import { Calendar } from "../../../../application/entities/calendar";

export class PrismaCalendarMapper {
  static toPrisma(calendar: Calendar) {
    return {
      id: calendar.id,
      date: calendar.date,
      fileUrl: calendar.fileUrl,
      createdAt: calendar.createdAt,
    };
  }

  static toDomain(raw: RawCalendar): Calendar {
    return new Calendar(
      {
        date: raw.date,
        fileUrl: raw.fileUrl,
        createdAt: raw.createdAt,
      },
      raw.id
    );
  }
}
