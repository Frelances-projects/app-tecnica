import { Injectable } from '@nestjs/common'

import { CalendarRepository } from '../../repositories/calendar-repository'
import { Calendar } from '../../entities/calendar'

interface CreateCalendarRequest {
  fileUrl: string
  date: string
}

interface CreateCalendarResponse {
  calendar: Calendar
}

@Injectable()
export class CreateCalendar {
  constructor(private calendarRepository: CalendarRepository) {}

  async execute(
    request: CreateCalendarRequest,
  ): Promise<CreateCalendarResponse> {
    try {
      const { date, fileUrl } = request

      const calendar = new Calendar({ date, fileUrl })

      await this.calendarRepository.create(calendar)

      return {
        calendar,
      }
    } catch (error) {
      throw error
    }
  }
}
