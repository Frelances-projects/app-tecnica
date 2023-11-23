import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import { Twilio } from 'twilio'
import { differenceInDays } from 'date-fns'

import { PrismaService } from '../database/prisma/prisma.service'

import type { Student as StudentRaw, Payment } from '@prisma/client'
import type TwilioClient from 'twilio/lib/rest/Twilio'

interface Student extends StudentRaw {
  payment: Payment
}

interface sendSmsData {
  students: Student[]
  body: string
}

@Injectable()
export class SendSmsPaymentScheduler {
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
    console.log('O SendSmsPaymentScheduler executou hoje')

    const students = await this.prisma.student.findMany({
      where: { payment: { method: 'INSTALLMENTS' } },
      include: { payment: true },
    })

    // Filtrar alunos com base no tempo decorrido desde a matrícula
    const today = new Date()

    // Filtrar alunos para o mês 1
    const studentsMonth1 = students.filter((student) => {
      const enrolledDate = new Date(student.enrolledAt)
      const daysSinceEnrollment = differenceInDays(today, enrolledDate)
      console.log(
        '🚀 ~ file: send-sms-payment-scheduler.ts:62 ~ SendSmsPaymentScheduler ~ studentsMonth1 ~ daysSinceEnrollment:',
        daysSinceEnrollment,
      )
      return daysSinceEnrollment >= 29 && daysSinceEnrollment <= 30
    })

    // Filtrar alunos para o mês 2
    const studentsMonth2 = students.filter((student) => {
      const enrolledDate = new Date(student.enrolledAt)
      const daysSinceEnrollment = differenceInDays(today, enrolledDate)
      console.log(
        '🚀 ~ file: send-sms-payment-scheduler.ts:70 ~ SendSmsPaymentScheduler ~ studentsMonth2 ~ daysSinceEnrollment:',
        daysSinceEnrollment,
      )
      return daysSinceEnrollment >= 58 && daysSinceEnrollment <= 59
    })

    // Filtrar alunos para o mês 3
    const studentsMonth3 = students.filter((student) => {
      const enrolledDate = new Date(student.enrolledAt)
      const daysSinceEnrollment = differenceInDays(today, enrolledDate)
      return daysSinceEnrollment >= 87 && daysSinceEnrollment <= 88
    })

    // Filtrar alunos par a o mês 4
    const studentsMonth4 = students.filter((student) => {
      const enrolledDate = new Date(student.enrolledAt)
      const daysSinceEnrollment = differenceInDays(today, enrolledDate)
      console.log(
        '🚀 ~ file: send-sms-payment-scheduler.ts:85 ~ SendSmsPaymentScheduler ~ studentsMonth4 ~ daysSinceEnrollment:',
        daysSinceEnrollment,
      )
      return daysSinceEnrollment >= 116 && daysSinceEnrollment <= 117
    })

    await Promise.all([
      this.sendSms({
        students: studentsMonth1,
        body: `Grupo Técnica - A sua parcela do primeiro mês está preste a vencer, por favor realize o pagamento!`,
      }),
      this.sendSms({
        students: studentsMonth2,
        body: `Grupo Técnica - A sua parcela do segundo mês está preste a vencer, por favor realize o pagamento!`,
      }),
      this.sendSms({
        students: studentsMonth3,
        body: `Grupo Técnica - A sua parcela do terceiro mês está preste a vencer, por favor realize o pagamento!`,
      }),
      this.sendSms({
        students: studentsMonth4,
        body: `Grupo Técnica - A sua parcela do quarto mês está preste a vencer, por favor realize o pagamento!`,
      }),
    ])
  }
}
