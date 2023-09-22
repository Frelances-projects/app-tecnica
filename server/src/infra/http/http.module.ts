import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { DatabaseModule } from '../database/database.module'

// CONTROLLERS
import { InformationController } from './controllers/information.controller'
import { StudentController } from './controllers/student.controller'
import { CalendarController } from './controllers/calendar.controller'
import { SchoolController } from './controllers/school.controller'
import { DriverLicenseCategoryController } from './controllers/driver-license-category.controller'
import { TestController } from './controllers/test.controller'
import { PaymentController } from './controllers/payment.controller'
import { ClassController } from './controllers/class.controller'
import { ScheduledClassController } from './controllers/scheduled-class.controller'
import { UserController } from './controllers/user.controller'

// INFORMATION
import { CreateInformation } from '../../application/use-cases/information/create-information'
import { GetInformationById } from '../../application/use-cases/information/get-information-by-id'
import { DeleteInformation } from '../../application/use-cases/information/delete-information'
import { UpdateInformation } from '../../application/use-cases/information/update-information'
import { GetManyInformation } from '../../application/use-cases/information/get-many-informations'
import { GetManyInformationBySchool } from '../../application/use-cases/information/get-many-informations-by-school'

// STUDENT
import { CreateStudent } from '../../application/use-cases/student/create-student'
import { GetManyStudents } from '../../application/use-cases/student/get-many-students'
import { GetManyStudentsBySchool } from '../../application/use-cases/student/get-many-students-by-school'
import { GetStudentByEmail } from '../../application/use-cases/student/get-student-by-email'
import { GetStudentById } from '../../application/use-cases/student/get-student-by-id'
import { GetStudentByNumber } from '../../application/use-cases/student/get-student-by-number'
import { UpdateStudent } from '../../application/use-cases/student/update-student'
import { CreateStudentSession } from 'src/application/use-cases/student/create-student-session'

// CALENDAR
import { CreateCalendar } from '../../application/use-cases/calendar/create-calendar'
import { GetCalendarById } from '../../application/use-cases/calendar/get-calendar-by-id'
import { GetCalendarBySchool } from '../../application/use-cases/calendar/get-calendar-by-school'
import { GetManyCalendar } from '../../application/use-cases/calendar/get-many-calendars'

// SCHOOL
import { CreateSchool } from '../../application/use-cases/school/create-school'
import { GetSchoolById } from '../../application/use-cases/school/get-school-by-id'
import { GetManySchool } from '../../application/use-cases/school/get-many-school'

// DRIVER LICENSE CATEGORY
import { CreateDriverLicenseCategory } from '../../application/use-cases/driver-license-category/create-driver-license-category'
import { GetDriverLicenseCategoryById } from '../../application/use-cases/driver-license-category/get-driver-license-category-by-id'
import { GetManyDriverLicenseCategory } from '../../application/use-cases/driver-license-category/get-many-driver-license-categories'
import { GetManyDriverLicenseCategoryBySchool } from '../../application/use-cases/driver-license-category/get-many-driver-license-categories-by-school'
import { UpdateDriverLicenseCategory } from '../../application/use-cases/driver-license-category/update-driver-license-category'

// TEST
import { CreateTest } from 'src/application/use-cases/test/create-test'
import { GetTestById } from 'src/application/use-cases/test/get-test-by-id'
import { GetManyTests } from '../../application/use-cases/test/get-many-tests'
import { GetManyTestsByStudent } from '../../application/use-cases/test/get-many-tests-by-student'
import { UpdateTest } from 'src/application/use-cases/test/update-test'

// PAYMENT
import { CreatePayment } from 'src/application/use-cases/payment/create-payment'
import { GetPaymentById } from 'src/application/use-cases/payment/get-payment-by-id'
import { UpdatePayment } from 'src/application/use-cases/payment/update-payment'

// CLASS
import { CreateClass } from 'src/application/use-cases/class/create-class'
import { GetClassById } from 'src/application/use-cases/class/get-class-by-id'
import { GetManyClasses } from 'src/application/use-cases/class/get-many-classes'
import { GetManyClassesByCategory } from 'src/application/use-cases/class/get-many-classes-by-category'
import { GetManyClassesByCategoryAndStudent } from 'src/application/use-cases/class/get-many-classes-by-category-and-student'

// SCHEDULE CLASS
import { CreateScheduledClass } from 'src/application/use-cases/scheduled-class/create-scheduled-class'
import { GetManyScheduledClasses } from 'src/application/use-cases/scheduled-class/get-many-scheduled-classes'
import { GetManyScheduledClassesByClass } from 'src/application/use-cases/scheduled-class/get-many-scheduled-classes-by-class'
import { GetManyScheduledClassesByStudent } from 'src/application/use-cases/scheduled-class/get-many-scheduled-classes-by-student'
import { GetScheduledClassById } from 'src/application/use-cases/scheduled-class/get-scheduled-class-by-id'
import { UpdateScheduledClass } from 'src/application/use-cases/scheduled-class/update-scheduled-class'
import { UpdateScheduledClassStatus } from 'src/application/use-cases/scheduled-class/update-scheduled-class-status'

// USER
import { CreateUser } from 'src/application/use-cases/user/create-user'
import { CreateUserSession } from 'src/application/use-cases/user/create-user-session'
import { GetManyUsers } from 'src/application/use-cases/user/get-many-users'
import { GetManyUsersBySchool } from 'src/application/use-cases/user/get-many-users-by-school'
import { GetUserByEmail } from 'src/application/use-cases/user/get-user-by-email'
import { GetUserById } from 'src/application/use-cases/user/get-user-by-id'
import { UpdateUser } from 'src/application/use-cases/user/update-user'

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
    DriverLicenseCategoryController,
    TestController,
    PaymentController,
    ClassController,
    ScheduledClassController,
    UserController,
  ],
  providers: [
    // INFORMATION
    CreateInformation,
    GetInformationById,
    DeleteInformation,
    UpdateInformation,
    GetManyInformation,
    GetManyInformationBySchool,

    // STUDENT
    CreateStudent,
    CreateStudentSession,
    GetManyStudents,
    GetManyStudentsBySchool,
    GetStudentByEmail,
    GetStudentById,
    GetStudentByNumber,
    UpdateStudent,

    // CALENDAR
    CreateCalendar,
    GetCalendarById,
    GetCalendarBySchool,
    GetManyCalendar,

    // SCHOOL
    CreateSchool,
    GetSchoolById,
    GetManySchool,

    // DRIVER LICENSE CATEGORY
    CreateDriverLicenseCategory,
    GetDriverLicenseCategoryById,
    GetManyDriverLicenseCategory,
    GetManyDriverLicenseCategoryBySchool,
    UpdateDriverLicenseCategory,

    // TEST
    CreateTest,
    GetTestById,
    GetManyTests,
    GetManyTestsByStudent,
    UpdateTest,

    // PAYMENT
    CreatePayment,
    GetPaymentById,
    UpdatePayment,

    // CLASS
    CreateClass,
    GetClassById,
    GetManyClasses,
    GetManyClassesByCategory,
    GetManyClassesByCategoryAndStudent,

    // SCHEDULE CLASS
    CreateScheduledClass,
    GetManyScheduledClasses,
    GetManyScheduledClassesByClass,
    GetManyScheduledClassesByStudent,
    GetScheduledClassById,
    UpdateScheduledClass,
    UpdateScheduledClassStatus,

    // USER
    CreateUser,
    CreateUserSession,
    GetManyUsers,
    GetManyUsersBySchool,
    GetUserByEmail,
    GetUserById,
    UpdateUser,

    GenerateHash,
    CompareHash,
    CreateToken,
    JwtService,
  ],
})
export class HttpModule {}
