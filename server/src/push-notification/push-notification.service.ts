import * as path from 'node:path'
import { Injectable } from '@nestjs/common'
import * as firebase from 'firebase-admin'
import { Twilio } from 'twilio'

import type TwilioClient from 'twilio/lib/rest/Twilio'

import { PrismaService } from 'src/infra/database/prisma/prisma.service'

firebase.initializeApp({
  credential: firebase.credential.cert(
    path.join(__dirname, '..', '..', 'firebase-adminsdk.json'),
  ),
  projectId: process.env.FIREBASE_PROJECT_ID,
})

interface SendNotificationToSchoolData {
  schoolId: string
  title: string
  body: string
}

interface SendNotificationToStudentData {
  studentId: string
  title: string
  body: string
}

interface SendSmsToSchoolData {
  schoolId: string
  body: string
}

interface SendSmsToStudentData {
  studentId: string
  body: string
}

@Injectable()
export class PushNotificationService {
  client: TwilioClient

  constructor(private prisma: PrismaService) {
    this.client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN,
    )
  }

  private async getTokensForSchool(schoolId: string): Promise<string[]> {
    const students = await this.prisma.student.findMany({
      where: { schoolId },
    })

    const firebaseTokens = students.flatMap((student) => student.firebaseTokens)

    return firebaseTokens
  }

  private async getPhoneNumbersFromStudentsInSchool(
    schoolId: string,
  ): Promise<string[]> {
    const students = await this.prisma.student.findMany({
      where: { schoolId },
    })

    const phoneNumbers = students.map((student) => student.phone)

    return phoneNumbers
  }

  async sendNotificationToSchool({
    schoolId,
    title,
    body,
  }: SendNotificationToSchoolData) {
    const tokens = await this.getTokensForSchool(schoolId)

    tokens.map(
      async (token) =>
        await firebase
          .messaging()
          .send({ notification: { title, body }, token }),
    )
  }

  async sendNotificationToStudent({
    studentId,
    title,
    body,
  }: SendNotificationToStudentData) {
    const { firebaseTokens } = await this.prisma.student.findUnique({
      where: { id: studentId },
      select: { firebaseTokens: true },
    })

    firebaseTokens.map(
      async (token) =>
        await firebase
          .messaging()
          .send({ notification: { title, body }, token }),
    )
  }

  async sendSmsToSchool({ schoolId, body }: SendSmsToSchoolData) {
    try {
      const phoneNumbers = await this.getPhoneNumbersFromStudentsInSchool(
        schoolId,
      )

      phoneNumbers.map(async (number) => {
        // const outgoingCallerIds = await this.client.outgoingCallerIds.list()

        // const outgoingCallerId = outgoingCallerIds.find(
        //   (outgoing) => outgoing.phoneNumber === number,
        // )

        // if (!outgoingCallerId) {
        //   await this.client.validationRequests.create({ phoneNumber: number })
        // }

        await this.client.messages.create({
          from: process.env.TWILIO_NUMBER,
          to: number,
          body,
        })
      })
    } catch (error) {
      if (error) throw error
    }
  }

  async sendSmsToStudent({ studentId, body }: SendSmsToStudentData) {
    try {
      const { phone } = await this.prisma.student.findUnique({
        where: { id: studentId },
        select: { phone: true },
      })

      // const outgoingCallerIds = await this.client.outgoingCallerIds.list()

      // const outgoingCallerId = outgoingCallerIds.find(
      //   (outgoing) => outgoing.phoneNumber === phone,
      // )

      // if (!outgoingCallerId) {
      //   await this.client.validationRequests.create({ phoneNumber: phone })
      // }

      await this.client.messages.create({
        from: process.env.TWILIO_NUMBER,
        to: phone,
        body,
      })
    } catch (error) {
      if (error) throw error
    }
  }
}
