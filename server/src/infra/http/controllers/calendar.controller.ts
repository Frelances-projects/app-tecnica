import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateCalendar } from 'src/application/use-cases/calendar/create-calendar';
import { GetCalendarById } from '../../../application/use-cases/calendar/get-calendar-by-id';
import { GetManyCalendar } from '../../../application/use-cases/calendar/get-many-calendars';

import { CalendarViewModel } from '../view-models/calendar-view-model';
import { CreateCalendarBody } from '../dtos/calendar/create-calendar-body';

@Controller('calendar')
export class CalendarController {
  constructor(
    private createCalendar: CreateCalendar,
    private getCalendarById: GetCalendarById,
    private getManyCalendar: GetManyCalendar,
  ) {}

  @Get(':calendarId')
  async getById(@Param('calendarId') calendarId: string) {
    const { calendar } = await this.getCalendarById.execute(
      calendarId,
    );

    return {
      calendar: CalendarViewModel.toHTTP(calendar),
    };
  }

  @Get()
  async getMany() {
    const { calendar } = await this.getManyCalendar.execute();

    const calendarToHTTP = calendar.map((calendar) =>
      CalendarViewModel.toHTTP(calendar),
    );

    return {
      calendar: calendarToHTTP,
    };
  }

  @Post()
  async create(@Body() body: CreateCalendarBody) {
    const { calendar } = await this.createCalendar.execute(body);

    return {
      calendar: CalendarViewModel.toHTTP(calendar),
    };
  }
}