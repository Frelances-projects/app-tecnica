import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { InformationRepository } from '../../application/repositories/information-repository';
import { PrismaInformationRepository } from './prisma/repositories/prisma-information-repository';

import { StudentsRepository } from '../../application/repositories/students-repository';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-student-repository';

import { CalendarRepository } from "../../application/repositories/calendar-repository";
import { PrismaCalendarRepository } from "./prisma/repositories/prisma-calendar-repository";

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
      provide: CalendarRepository,
      useClass: PrismaCalendarRepository,
    },
  ],
  exports: [InformationRepository, StudentsRepository, CalendarRepository],
})
export class DatabaseModule {}
