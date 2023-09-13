import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Class } from '../../entities/class'
import { ClassRepository } from '../../repositories/class-repository'

interface GetManyClassesByCategoryAndStudentRequest {
  studentId: string
  category: 'THEORETICAL' | 'PRACTICAL'
}

interface GetManyClassesByCategoryAndStudentResponse {
  classes: Class[]
}

@Injectable()
export class GetManyClassesByCategoryAndStudent {
  constructor(private classRepository: ClassRepository) {}

  async execute(
    request: GetManyClassesByCategoryAndStudentRequest,
  ): Promise<GetManyClassesByCategoryAndStudentResponse> {
    try {
      const { category, studentId } = request

      const classes = await this.classRepository.findManyByCategoryAndStudent(
        category,
        studentId,
      )

      return {
        classes,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
