import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

import { PrismaService } from '../database/prisma/prisma.service'

@Injectable()
export class ChangeScheduledClassStatusScheduler {
  constructor(private prisma: PrismaService) {}

  @Cron('0 0 * * *') // roda todo dia às 00:00
  async execute() {
    console.log('O ChangeScheduledClassStatusScheduler executou hoje')

    const scheduledClasses = await this.prisma.scheduledClass.findMany({
      where: { status: 'CONFIRMED', class: { category: 'PRACTICAL' } },
    })

    const currentDate = new Date()

    for (const scheduledClass of scheduledClasses) {
      const scheduledDate = new Date(scheduledClass.schedulingDate)

      if (scheduledDate < currentDate) {
        await this.prisma.scheduledClass.update({
          where: { id: scheduledClass.id },
          data: { status: 'COMPLETED' },
        })
      }
    }
  }
}
