import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { StudentsRepository } from '../../repositories/students-repository'
import { Student } from '../../entities/student'

interface GetStudentByEmailResponse {
  student: Student | null
}

@Injectable()
export class GetStudentByEmail {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(email: string): Promise<GetStudentByEmailResponse> {
    try {
      const student = await this.studentsRepository.findByEmail(email)

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
