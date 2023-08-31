import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { DatabaseModule } from '../database/database.module'

// CONTROLLERS
import { InformationController } from './controllers/information.controller'
import { StudentController } from './controllers/student.controller'
import { CalendarController } from './controllers/calendar.controller'
import { SchoolController } from './controllers/school.controller'
import { TestController } from './controllers/test.controller'
import { PaymentController } from './controllers/payment.controller'
import { InstallmentsController } from './controllers/installments.controller'

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

// STUDENT
import { CreateSchool } from '../../application/use-cases/school/create-school'
import { CreateStudentSession } from 'src/application/use-cases/student/create-student-session'
import { GetSchoolById } from '../../application/use-cases/school/get-school-by-id'
import { GetManySchool } from '../../application/use-cases/school/get-many-school'

// TEST
import { CreateTest } from 'src/application/use-cases/test/create-test'
import { GetTestById } from 'src/application/use-cases/test/get-test-by-id'
import { GetManyTests } from '../../application/use-cases/test/get-many-tests'
import { UpdateTest } from 'src/application/use-cases/test/update-test'

// PAYMENT
import { CreatePayment } from 'src/application/use-cases/payment/create-payment'
import { GetPaymentById } from 'src/application/use-cases/payment/get-payment-by-id'
import { UpdatePayment } from 'src/application/use-cases/payment/update-payment'

// INSTALLMENTS
import { CreateInstallments } from 'src/application/use-cases/installments/create-installments'
import { GetInstallmentsById } from 'src/application/use-cases/installments/get-installments-by-id'
import { UpdateInstallments } from 'src/application/use-cases/installments/update-installments'

import { GenerateHash } from 'src/helpers/generate-hash'
import { CompareHash } from 'src/helpers/compare-hash'
import { CreateToken } from 'src/helpers/create-token'

@Module({
  imports: [DatabaseModule],
  controllers: [
    InformationController,
    StudentController,
    CalendarController,
    SchoolController,
    TestController,
    PaymentController,
    InstallmentsController,
  ],
  providers: [
    // INFORMATION
    CreateInformation,
    GetInformationById,
    UpdateInformation,
    GetManyInformation,

    // STUDENT
    CreateStudent,
    CreateStudentSession,
    GetManyStudents,
    GetStudentByEmail,
    GetStudentById,
    GetStudentByNumber,
    UpdateStudent,

    // CALENDAR
    CreateCalendar,
    GetCalendarById,
    GetManyCalendar,

    // SCHOOL
    CreateSchool,
    GetSchoolById,
    GetManySchool,

    // TEST
    CreateTest,
    GetTestById,
    GetManyTests,
    UpdateTest,

    // PAYMENT
    CreatePayment,
    GetPaymentById,
    UpdatePayment,

    // INSTALLMENTS
    CreateInstallments,
    GetInstallmentsById,
    UpdateInstallments,

    GenerateHash,
    CompareHash,
    CreateToken,
    JwtService,
  ],
})
export class HttpModule {}
