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
  number?: number
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
      const { id, email, name, number, schoolId, driverLicenseCategoryId } =
        request

      const { student } = await this.getStudentById.execute(id)

      const { student: foundStudentByEmail } =
        await this.getStudentByEmail.execute(email)

      if (foundStudentByEmail.email === email) {
        throw new ConflictException('This email has already been used')
      }

      const { student: foundStudentByNumber } =
        await this.getStudentByNumber.execute(number)

      if (foundStudentByNumber.number === number) {
        throw new ConflictException('This number has already been used')
      }

      student.name = name ?? student.name
      student.email = email ?? student.email
      student.schoolId = schoolId ?? student.schoolId
      student.driverLicenseCategoryId =
        driverLicenseCategoryId ?? student.driverLicenseCategoryId
      student.number = number ?? student.number

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
