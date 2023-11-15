import * as path from 'node:path'
import { Injectable } from '@nestjs/common'
import * as firebase from 'firebase-admin'

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

@Injectable()
export class PushNotificationService {
  constructor(private prisma: PrismaService) {}

  private async getTokensForSchool(schoolId: string): Promise<string[]> {
    const students = await this.prisma.student.findMany({
      where: { schoolId },
    })

    const firebaseTokens = students.flatMap((student) => student.firebaseTokens)

    return firebaseTokens
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
}
