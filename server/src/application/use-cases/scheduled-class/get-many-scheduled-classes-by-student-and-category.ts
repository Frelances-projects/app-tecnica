import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

interface GetManyScheduledClassesByStudentAndCategoryClassResponse {
  scheduledClasses: ScheduledClass[]
}

@Injectable()
export class GetManyScheduledClassesByStudentAndCategoryClass {
  constructor(private scheduledClassRepository: ScheduledClassRepository) {}

  async execute(
    studentId: string,
    categoryClass: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<GetManyScheduledClassesByStudentAndCategoryClassResponse> {
    try {
      const scheduledClasses =
        await this.scheduledClassRepository.findManyByStudentAndCategoryClass(
          studentId,
          categoryClass,
        )

      return {
        scheduledClasses,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
