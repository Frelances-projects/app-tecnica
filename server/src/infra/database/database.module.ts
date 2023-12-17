import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'

import { InformationRepository } from '../../application/repositories/information-repository'
import { PrismaInformationRepository } from './prisma/repositories/prisma-information-repository'

import { StudentsRepository } from '../../application/repositories/students-repository'
import { PrismaStudentsRepository } from './prisma/repositories/prisma-student-repository'

import { CalendarRepository } from '../../application/repositories/calendar-repository'
import { PrismaCalendarRepository } from './prisma/repositories/prisma-calendar-repository'

import { PaymentRepository } from '../../application/repositories/payment-repository'
import { PrismaPaymentRepository } from './prisma/repositories/prisma-payment-repository'

import { GroupsRepository } from '../../application/repositories/groups-repository'
import { PrismaGroupsRepository } from './prisma/repositories/prisma-groups-repository'

import { SchoolRepository } from '../../application/repositories/school-repository'
import { PrismaSchoolRepository } from './prisma/repositories/prisma-school-repository'

import { DriverLicenseCategoryRepository } from '../../application/repositories/driver-license-category-repository'
import { PrismaDriverLicenseCategoryRepository } from './prisma/repositories/prisma-driver-license-category-repository'

import { TestRepository } from '../../application/repositories/tests-repository'
import { PrismaTestRepository } from './prisma/repositories/prisma-test-repository'

import { ClassRepository } from '../../application/repositories/class-repository'
import { PrismaClassRepository } from './prisma/repositories/prisma-class-repository'

import { ScheduledClassRepository } from '../../application/repositories/scheduled-class-repository'
import { PrismaScheduledClassRepository } from './prisma/repositories/prisma-scheduled-class-repository'

import { UserRepository } from '../../application/repositories/user-repository'
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: InformationRepository,
      useClass: PrismaInformationRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentsRepository,
    },
    {
      provide: PaymentRepository,
      useClass: PrismaPaymentRepository,
    },
    {
      provide: CalendarRepository,
      useClass: PrismaCalendarRepository,
    },
    {
      provide: GroupsRepository,
      useClass: PrismaGroupsRepository,
    },
    {
      provide: SchoolRepository,
      useClass: PrismaSchoolRepository,
    },
    {
      provide: DriverLicenseCategoryRepository,
      useClass: PrismaDriverLicenseCategoryRepository,
    },
    {
      provide: TestRepository,
      useClass: PrismaTestRepository,
    },
    {
      provide: ClassRepository,
      useClass: PrismaClassRepository,
    },
    {
      provide: ScheduledClassRepository,
      useClass: PrismaScheduledClassRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    PrismaService,
    InformationRepository,
    StudentsRepository,
    CalendarRepository,
    PaymentRepository,
    GroupsRepository,
    SchoolRepository,
    DriverLicenseCategoryRepository,
    TestRepository,
    ClassRepository,
    ScheduledClassRepository,
    UserRepository,
  ],
})
export class DatabaseModule {}
