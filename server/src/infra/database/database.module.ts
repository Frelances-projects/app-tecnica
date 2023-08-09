import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { InformationRepository } from '../../application/repositories/information-repository';
import { PrismaInformationRepository } from './prisma/repositories/prisma-information-repository';

import { StudentsRepository } from '../../application/repositories/students-repository';
import { PrismaStudentsRepository } from './prisma/repositories/prisma-student-repository';

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
  ],
  exports: [InformationRepository, StudentsRepository],
})
export class DatabaseModule {}
