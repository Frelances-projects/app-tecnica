import { Module } from '@nestjs/common';

import { PrismaService } from './prisma/prisma.service';

import { InformationRepository } from '../../application/repositories/information-repository';
import { PrismaInformationRepository } from './prisma/repositories/prisma-information-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: InformationRepository,
      useClass: PrismaInformationRepository,
    },
  ],
  exports: [InformationRepository],
})
export class DatabaseModule {}
