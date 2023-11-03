import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

interface GetManyScheduledClassesByClassResponse {
  scheduledClasses: ScheduledClass[]
}

@Injectable()
export class GetManyScheduledClassesByCategoryClass {
  constructor(private scheduledClassRepository: ScheduledClassRepository) {}

  async execute(
    categoryClass: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<GetManyScheduledClassesByClassResponse> {
    try {
      console.log(
        '🚀 ~ file: get-many-scheduled-classes-by-category-class.ts:19 ~ GetManyScheduledClassesByCategoryClass ~ scheduledClasses:',
        categoryClass,
      )
      const scheduledClasses =
        await this.scheduledClassRepository.findManyByCategoryClass(
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
