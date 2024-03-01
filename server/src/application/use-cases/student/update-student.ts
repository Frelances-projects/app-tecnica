import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'

import { StudentsRepository } from '../../repositories/students-repository'
import { GetStudentById } from './get-student-by-id'
import { Student } from '../../entities/student'
import { GetStudentByNumber } from './get-student-by-number'
import { GetStudentByEmail } from './get-student-by-email'

interface UpdateStudentRequest {
  id: string
  name?: string
  email?: string
  schoolId?: string
  driverLicenseCategoryId?: string
  firebaseToken?: string
  // enrolledAt?: string
  imtId?: string
  number?: number
  phone?: string
}

interface UpdateStudentResponse {
  student: Student
}

@Injectable()
export class UpdateStudent {
  constructor(
    private studentsRepository: StudentsRepository,
    private getStudentById: GetStudentById,
    private getStudentByEmail: GetStudentByEmail,
    private getStudentByNumber: GetStudentByNumber,
  ) {}

  async execute(request: UpdateStudentRequest): Promise<UpdateStudentResponse> {
    try {
      const {
        id,
        email,
        name,
        number,
        schoolId,
        driverLicenseCategoryId,
        firebaseToken,
        phone,
        imtId,
        // enrolledAt,
      } = request

      const { student } = await this.getStudentById.execute(id)

      if (email) {
        const { student: foundStudentByEmail } =
          await this.getStudentByEmail.execute(email)

        if (
          foundStudentByEmail &&
          foundStudentByEmail.id !== id &&
          foundStudentByEmail.email === email
        ) {
          throw new ConflictException('This email has already been used')
        }
      }

      if (number) {
        const { student: foundStudentByNumber } =
          await this.getStudentByNumber.execute(number)

        if (
          foundStudentByNumber &&
          foundStudentByNumber.id !== id &&
          foundStudentByNumber.number === number
        ) {
          throw new ConflictException('This number has already been used')
        }
      }

      student.name = name ?? student.name
      student.email = email ?? student.email
      student.schoolId = schoolId ?? student.schoolId
      // student.enrolledAt = enrolledAt ?? student.enrolledAt
      student.driverLicenseCategoryId =
        driverLicenseCategoryId ?? student.driverLicenseCategoryId
      student.number = number ?? student.number
      student.phone = phone ?? student.phone
      student.imtId = imtId ?? student.imtId

      if (firebaseToken) {
        const studentFirebaseTokens = student.firebaseTokens

        const token = studentFirebaseTokens.find(
          (token) => token === firebaseToken,
        )

        if (!token) {
          studentFirebaseTokens.push(firebaseToken)

          student.firebaseTokens = studentFirebaseTokens
        }
      }

      await this.studentsRepository.save(student)

      return {
        student,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
