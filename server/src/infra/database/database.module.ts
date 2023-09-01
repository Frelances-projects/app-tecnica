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

import { SchoolRepository } from '../../application/repositories/school-repository'
import { PrismaSchoolRepository } from './prisma/repositories/prisma-school-repository'

import { TestRepository } from '../../application/repositories/tests-repository'
import { PrismaTestRepository } from './prisma/repositories/prisma-test-repository'

import { InstallmentsRepository } from '../../application/repositories/installments-repository'
import { PrismaInstallmentsRepository } from './prisma/repositories/prisma-installments-repository'

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
      provide: SchoolRepository,
      useClass: PrismaSchoolRepository,
    },
    {
      provide: TestRepository,
      useClass: PrismaTestRepository,
    },
    {
      provide: InstallmentsRepository,
      useClass: PrismaInstallmentsRepository,
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
    InformationRepository,
    StudentsRepository,
    CalendarRepository,
    PaymentRepository,
    SchoolRepository,
    TestRepository,
    InstallmentsRepository,
    ClassRepository,
    ScheduledClassRepository,
    UserRepository,
  ],
})
export class DatabaseModule {}
