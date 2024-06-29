import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

interface GetManyScheduledClassesByClassResponse {
  scheduledClasses: ScheduledClass[]
  total: number
}

@Injectable()
export class GetManyScheduledClassesBySchoolAndCategoryClass {
  constructor(private scheduledClassRepository: ScheduledClassRepository) {}

  async execute(
    schoolId: string,
    categoryClass: 'THEORETICAL' | 'PRACTICAL',
    page?: number,
  ): Promise<GetManyScheduledClassesByClassResponse> {
    try {
      const { scheduledClasses, total } =
        await this.scheduledClassRepository.findManyBySchoolAndCategoryClass(
          schoolId,
          categoryClass,
          { page },
        )

      return {
        scheduledClasses,
        total,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
