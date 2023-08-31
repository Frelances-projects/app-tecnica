import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { CalendarRepository } from '../../repositories/calendar-repository'
import { Calendar } from '../../entities/calendar'

interface GetManyCalendarResponse {
  calendar: Calendar[]
}

@Injectable()
export class GetManyCalendar {
  constructor(private calendarRepository: CalendarRepository) {}

  async execute(): Promise<GetManyCalendarResponse> {
    try {
      const calendar = await this.calendarRepository.findMany()

      return {
        calendar,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
