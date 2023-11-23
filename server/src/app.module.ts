import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { DatabaseModule } from './infra/database/database.module'
import { HttpModule } from './infra/http/http.module'

@Module({
  imports: [HttpModule, DatabaseModule, ScheduleModule.forRoot()],
})
export class AppModule {}
