import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { CalendarRepository } from '../../repositories/calendar-repository'
import { Calendar } from '../../entities/calendar'

interface CreateCalendarRequest {
  fileUrl: string
  schoolId: string
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
      const { schoolId, fileUrl } = request

      const calendar = new Calendar({ schoolId, fileUrl })

      await this.calendarRepository.create(calendar)

      return {
        calendar,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
