import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

import { PrismaService } from '../database/prisma/prisma.service'
import { generateRandomCode } from 'src/helpers/generate-random-code'

@Injectable()
export class ChangeCondeLessonsScheduler {
  constructor(private prisma: PrismaService) {}

  @Cron('0 0 * * *') // roda todo dia às 00:00
  async execute() {
    console.log('O ChangeCondeLessonsScheduler executou hoje')

    const [lessons, codeLessons] = await Promise.all([
      this.prisma.class.findMany(),
      this.prisma.class.findMany({ where: { category: 'THEORETICAL' } }),
    ])

    for (const codeLesson of codeLessons) {
      let uniqueCode: number
      do {
        uniqueCode = generateRandomCode(6)
      } while (lessons.some((lesson) => lesson.code === uniqueCode))

      await this.prisma.class.update({
        where: { id: codeLesson.id },
        data: { ...codeLesson, code: uniqueCode },
      })
    }
  }
}
