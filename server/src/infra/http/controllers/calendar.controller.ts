import { Body, Controller, Get, Param, Post } from '@nestjs/common'

import { CreateCalendar } from 'src/application/use-cases/calendar/create-calendar'
import { GetCalendarById } from '../../../application/use-cases/calendar/get-calendar-by-id'
import { GetCalendarBySchool } from '../../../application/use-cases/calendar/get-calendar-by-school'
import { GetManyCalendar } from '../../../application/use-cases/calendar/get-many-calendars'

import { CalendarViewModel } from '../view-models/calendar-view-model'
import { CreateCalendarBody } from '../dtos/calendar/create-calendar-body'

import { PushNotificationService } from 'src/push-notification/push-notification.service'

@Controller('calendar')
export class CalendarController {
  constructor(
    private createCalendar: CreateCalendar,
    private getCalendarById: GetCalendarById,
    private getCalendarBySchool: GetCalendarBySchool,
    private getManyCalendar: GetManyCalendar,
    private pushNotificationService: PushNotificationService,
  ) {}

  @Get(':calendarId')
  async getById(@Param('calendarId') calendarId: string) {
    const { calendar } = await this.getCalendarById.execute(calendarId)

    return {
      calendar: CalendarViewModel.toHTTP(calendar),
    }
  }

  @Get()
  async getMany() {
    const { calendar } = await this.getManyCalendar.execute()

    const calendarToHTTP = calendar.map((calendar) =>
      CalendarViewModel.toHTTP(calendar),
    )

    return {
      calendar: calendarToHTTP,
    }
  }

  @Get('/school/:schoolId')
  async getBySchool(@Param('schoolId') schoolId: string) {
    const { calendar } = await this.getCalendarBySchool.execute(schoolId)

    return {
      calendar: calendar ? CalendarViewModel.toHTTP(calendar) : undefined,
    }
  }

  @Post()
  async create(@Body() body: CreateCalendarBody) {
    const { calendar } = await this.createCalendar.execute(body)

    await this.pushNotificationService.sendNotificationToSchool({
      schoolId: calendar.schoolId,
      title: 'Novo Calendário de aulas!',
      body: 'A sua escola acabou de adicionar um novo calendário de aulas',
    })

    return {
      calendar: CalendarViewModel.toHTTP(calendar),
    }
  }
}
