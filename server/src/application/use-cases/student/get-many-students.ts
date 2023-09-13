import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { StudentsRepository } from '../../repositories/students-repository'
import { Student } from '../../entities/student'

interface GetManyStudentsResponse {
  students: Student[]
}

@Injectable()
export class GetManyStudents {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(): Promise<GetManyStudentsResponse> {
    try {
      const students = await this.studentsRepository.findMany()

      return {
        students,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
