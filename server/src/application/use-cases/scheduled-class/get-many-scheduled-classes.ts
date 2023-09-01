import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

interface GetManyScheduledClassesResponse {
  scheduledClasses: ScheduledClass[]
}

@Injectable()
export class GetManyScheduledClasses {
  constructor(private scheduledClassRepository: ScheduledClassRepository) {}

  async execute(): Promise<GetManyScheduledClassesResponse> {
    try {
      const scheduledClasses = await this.scheduledClassRepository.findMany()

      return {
        scheduledClasses,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
