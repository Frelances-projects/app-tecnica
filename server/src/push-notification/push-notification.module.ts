import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { DatabaseModule } from 'src/infra/database/database.module'

import { PushNotificationService } from './push-notification.service'

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  providers: [PushNotificationService],
  exports: [PushNotificationService],
})
export class PushNotificationModule {}
