import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'

import { StudentsRepository } from '../../repositories/students-repository'
import { Student } from '../../entities/student'

interface GetStudentByIdResponse {
  student: Student
}

@Injectable()
export class GetStudentById {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(studentId: string): Promise<GetStudentByIdResponse> {
    try {
      const student = await this.studentsRepository.findById(studentId)

      if (!student) {
        throw new NotFoundException('student not found')
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
