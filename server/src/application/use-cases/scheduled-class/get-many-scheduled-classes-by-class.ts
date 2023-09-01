import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

interface GetManyScheduledClassesByClassResponse {
  scheduledClasses: ScheduledClass[]
}

@Injectable()
export class GetManyScheduledClassesByClass {
  constructor(private scheduledClassRepository: ScheduledClassRepository) {}

  async execute(
    classId: string,
  ): Promise<GetManyScheduledClassesByClassResponse> {
    try {
      const scheduledClasses =
        await this.scheduledClassRepository.findManyByClassId(classId)

      return {
        scheduledClasses,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
