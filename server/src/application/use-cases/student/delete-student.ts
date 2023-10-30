import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { StudentsRepository } from '../../repositories/students-repository'
import { GetStudentById } from './get-student-by-id'

@Injectable()
export class DeleteStudent {
  constructor(
    private studentsRepository: StudentsRepository,
    private getStudentById: GetStudentById,
  ) {}

  async execute(studentId: string): Promise<void> {
    try {
      const { student } = await this.getStudentById.execute(studentId)

      await this.studentsRepository.delete(student.id)
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
