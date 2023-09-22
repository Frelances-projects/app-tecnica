import { Calendar } from '../entities/calendar'

export abstract class CalendarRepository {
  abstract create(calendar: Calendar): Promise<void>
  abstract findById(calendarId: string): Promise<Calendar | null>
  abstract findBySchool(schoolId: string): Promise<Calendar | null>
  abstract findMany(): Promise<Calendar[]>
}
