import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { CalendarRepository } from '../../repositories/calendar-repository'
import { Calendar } from '../../entities/calendar'

interface GetCalendarByIdResponse {
  calendar: Calendar
}

@Injectable()
export class GetCalendarById {
  constructor(private calendarRepository: CalendarRepository) {}

  async execute(calendarId: string): Promise<GetCalendarByIdResponse> {
    try {
      const calendar = await this.calendarRepository.findById(calendarId)

      if (!calendar) {
        throw new NotFoundException('calendar not found')
      }

      return {
        calendar,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
