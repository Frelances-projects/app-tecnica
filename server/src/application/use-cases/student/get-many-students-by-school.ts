import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { StudentsRepository } from '../../repositories/students-repository'
import { Student } from '../../entities/student'

interface GetManyStudentsBySchoolResponse {
  students: Student[]
}

@Injectable()
export class GetManyStudentsBySchool {
  constructor(private studentsRepository: StudentsRepository) {}

  async execute(schoolId: string): Promise<GetManyStudentsBySchoolResponse> {
    try {
      const students = await this.studentsRepository.findManyBySchool(schoolId)

      return {
        students,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
