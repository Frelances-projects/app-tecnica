import { Injectable } from '@nestjs/common';

import { CalendarRepository } from '../../repositories/calendar-repository';
import { Calendar } from '../../entities/calendar';

interface GetCalendarByIdResponse {
  calendar: Calendar;
}

@Injectable()
export class GetCalendarById {
  constructor(private calendarRepository: CalendarRepository) {}

  async execute(calendarId: string): Promise<GetCalendarByIdResponse> {
    try {
      const calendar = await this.calendarRepository.findById(
        calendarId,
      );

      if (!calendar) {
        throw new Error('calendar not found');
      }

      return {
        calendar,
      };
    } catch (error) {
      throw error;
    }
  }
}
