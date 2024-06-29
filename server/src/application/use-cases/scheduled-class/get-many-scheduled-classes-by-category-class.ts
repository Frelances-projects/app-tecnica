import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

interface GetManyScheduledClassesByClassResponse {
  scheduledClasses: ScheduledClass[]
  total: number
}

@Injectable()
export class GetManyScheduledClassesByCategoryClass {
  constructor(private scheduledClassRepository: ScheduledClassRepository) {}

  async execute(
    categoryClass: 'THEORETICAL' | 'PRACTICAL',
    page?: number,
  ): Promise<GetManyScheduledClassesByClassResponse> {
    try {
      console.log(
        '🚀 ~ file: get-many-scheduled-classes-by-category-class.ts:19 ~ GetManyScheduledClassesByCategoryClass ~ scheduledClasses:',
        categoryClass,
      )
      const { scheduledClasses, total } =
        await this.scheduledClassRepository.findManyByCategoryClass(
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
