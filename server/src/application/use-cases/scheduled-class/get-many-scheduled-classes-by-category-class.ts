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
