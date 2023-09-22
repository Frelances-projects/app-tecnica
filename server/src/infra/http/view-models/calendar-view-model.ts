import { Calendar } from '../../../application/entities/calendar'

export class CalendarViewModel {
  static toHTTP(calendar: Calendar) {
    return {
      id: calendar.id,
      schoolId: calendar.schoolId,
      fileUrl: calendar.fileUrl,
      createdAt: calendar.createdAt,
    }
  }
}
