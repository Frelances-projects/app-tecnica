import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'

// CONTROLLERS
import { InformationController } from './controllers/information.controller'
import { StudentController } from './controllers/student.controller'
import { CalendarController } from './controllers/calendar.controller'

// INFORMATION
import { CreateInformation } from '../../application/use-cases/information/create-information'
import { GetInformationById } from '../../application/use-cases/information/get-information-by-id'
import { UpdateInformation } from '../../application/use-cases/information/update-information'
import { GetManyInformation } from '../../application/use-cases/information/get-many-informations'

// STUDENT
import { CreateStudent } from '../../application/use-cases/student/create-student'
import { GetManyStudents } from '../../application/use-cases/student/get-many-students'
import { GetStudentByEmail } from '../../application/use-cases/student/get-student-by-email'
import { GetStudentById } from '../../application/use-cases/student/get-student-by-id'
import { GetStudentByNumber } from '../../application/use-cases/student/get-student-by-number'
import { UpdateStudent } from '../../application/use-cases/student/update-student'

// CALENDAR
import { CreateCalendar } from '../../application/use-cases/calendar/create-calendar'
import { GetCalendarById } from '../../application/use-cases/calendar/get-calendar-by-id'
import { GetManyCalendar } from '../../application/use-cases/calendar/get-many-calendars'

@Module({
  imports: [DatabaseModule],
  controllers: [InformationController, StudentController, CalendarController],
  providers: [
    // INFORMATION
    CreateInformation,
    GetInformationById,
    UpdateInformation,
    GetManyInformation,

    // STUDENT
    CreateStudent,
    GetManyStudents,
    GetStudentByEmail,
    GetStudentById,
    GetStudentByNumber,
    UpdateStudent,

    // CALENDAR
    CreateCalendar,
    GetCalendarById,
    GetManyCalendar,
  ],
})
export class HttpModule {}
