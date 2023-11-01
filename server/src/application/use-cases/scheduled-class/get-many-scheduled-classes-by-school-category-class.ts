import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

interface GetManyScheduledClassesByClassResponse {
  scheduledClasses: ScheduledClass[]
}

@Injectable()
export class GetManyScheduledClassesBySchoolAndCategoryClass {
  constructor(private scheduledClassRepository: ScheduledClassRepository) {}

  async execute(
    schoolId: string,
    categoryClass: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<GetManyScheduledClassesByClassResponse> {
    try {
      const scheduledClasses =
        await this.scheduledClassRepository.findManyBySchoolAndCategoryClass(
          schoolId,
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
