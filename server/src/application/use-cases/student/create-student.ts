import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common'

import { Student } from '../../entities/student'
import { StudentsRepository } from '../../repositories/students-repository'
import { GetStudentByEmail } from './get-student-by-email'
import { GetStudentByNumber } from './get-student-by-number'

interface CreateStudentRequest {
  name: string
  email: string
  schoolId: string
  paymentId: string
  driverLicenseCategory: 'A' | 'B' | 'C' | 'ALL'
  number: number
  enrolledAt: string
}

interface CreateStudentResponse {
  student: Student
}

@Injectable()
export class CreateStudent {
  constructor(
    private studentsRepository: StudentsRepository,
    private getStudentByEmail: GetStudentByEmail,
    private getStudentByNumber: GetStudentByNumber,
  ) {}

  async execute(request: CreateStudentRequest): Promise<CreateStudentResponse> {
    try {
      const {
        email,
        name,
        enrolledAt,
        schoolId,
        paymentId,
        driverLicenseCategory,
        number,
      } = request

      const { student: foundStudentByEmail } =
        await this.getStudentByEmail.execute(email)

      if (foundStudentByEmail) {
        if (
          foundStudentByEmail.email &&
          foundStudentByEmail.number === number
        ) {
          throw new ConflictException(
            'This email and number has already been used',
          )
        }

        throw new ConflictException('This email has already been used')
      }

      const { student: foundStudentByNumber } =
        await this.getStudentByNumber.execute(number)

      if (foundStudentByNumber) {
        throw new ConflictException('This number has already been used')
      }

      const student = new Student({
        email,
        name,
        enrolledAt,
        number,
        schoolId,
        paymentId,
        driverLicenseCategory,
      })

      await this.studentsRepository.create(student)

      return {
        student,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
