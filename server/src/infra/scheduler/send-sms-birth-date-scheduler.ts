import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { Twilio } from 'twilio'

import { PrismaService } from '../database/prisma/prisma.service'

import type { Student } from '@prisma/client'
import type TwilioClient from 'twilio/lib/rest/Twilio'

interface sendSmsData {
  students: Student[]
  body: string
}

@Injectable()
export class SendSmsBirthDateScheduler {
  client: TwilioClient

  constructor(private prisma: PrismaService) {
    this.client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    )
  }

  private async sendSms({ students, body }: sendSmsData) {
    try {
      for (const student of students) {
        await this.client.messages.create({
          from: process.env.TWILIO_NUMBER,
          to: student.phone,
          body,
        })
      }
    } catch (error) {
      if (error) throw error
    }
  }

  @Cron('0 0 * * *') // roda todo dia às 00:00
  async getStudents() {
    console.log('O SendSmsBirthDateScheduler executou hoje')

    const today = new Date().toISOString().split('T')[0]

    const studentsWithBirthday = await this.prisma.student.findMany({
      where: {
        birthDate: today,
      },
    })

    if (studentsWithBirthday.length > 0) {
      await this.sendSms({
        students: studentsWithBirthday,
        body: 'O Grupo Técnica deseja um feliz aniversário!',
      })
    }
  }
}
