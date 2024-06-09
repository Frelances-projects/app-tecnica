import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

import { PrismaService } from '../database/prisma/prisma.service'

@Injectable()
export class ChangeScheduledClassStatusScheduler {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async execute() {
    console.log('O ChangeScheduledClassStatusScheduler executou hoje')

    const scheduledClasses = await this.prisma.scheduledClass.findMany({
      where: {
        status: { notIn: ['CANCELED', 'COMPLETED', 'MISSED', 'UNCHECKED'] },
        class: { category: 'PRACTICAL' },
      },
    })

    const currentDate = new Date()

    for (const scheduledClass of scheduledClasses) {
      const [hour, minute] = scheduledClass.schedulingHour.split(':')
      const scheduledDate = new Date(scheduledClass.schedulingDate)

      scheduledDate.setUTCHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0)

      if (scheduledDate < currentDate) {
        await this.prisma.scheduledClass.update({
          where: { id: scheduledClass.id },
          data: { status: 'COMPLETED' },
        })
      }
    }
  }
}
