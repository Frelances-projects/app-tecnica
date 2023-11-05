import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { CalendarRepository } from '../../repositories/calendar-repository'
import { Calendar } from '../../entities/calendar'

interface GetCalendarBySchoolResponse {
  calendar: Calendar
}

@Injectable()
export class GetCalendarBySchool {
  constructor(private calendarRepository: CalendarRepository) {}

  async execute(schoolId: string): Promise<GetCalendarBySchoolResponse> {
    try {
      const calendar = await this.calendarRepository.findBySchool(schoolId)

      // if (!calendar) {
      //   throw new NotFoundException('calendar not found')
      // }

      return {
        calendar,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
