import { Calendar } from '../../../application/entities/calendar'

export class CalendarViewModel {
  static toHTTP(calendar: Calendar) {
    return {
      id: calendar.id,
      date: calendar.date,
      fileUrl: calendar.fileUrl,
      createdAt: calendar.createdAt,
    }
  }
}
