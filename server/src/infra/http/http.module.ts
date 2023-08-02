import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';

import { CreateInformation } from '../../application/use-cases/information/create-information';
import { GetInformationById } from '../../application/use-cases/information/get-information-by-id';
import { UpdateInformation } from '../../application/use-cases/information/update-information';
import { InformationController } from './controllers/information.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [InformationController],
  providers: [CreateInformation, GetInformationById, UpdateInformation],
})
export class HttpModule {}
