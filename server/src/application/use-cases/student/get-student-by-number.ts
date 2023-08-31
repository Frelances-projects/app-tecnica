import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { StudentsRepository } from '../../repositories/students-repository'
import { Student } from '../../entities/student'

interface GetStudentByNumberResponse {
  student: Student | null
}

@Injectable()
export class GetStudentByNumber {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(number: number): Promise<GetStudentByNumberResponse> {
    try {
      const student = await this.studentsRepository.findByNumber(number)

      if (!student) {
        return { student: null }
      }

      return {
        student,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
