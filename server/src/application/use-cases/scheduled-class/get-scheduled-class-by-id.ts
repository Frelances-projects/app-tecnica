import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

interface GetScheduledClassByIdResponse {
  scheduledClass: ScheduledClass
}

@Injectable()
export class GetScheduledClassById {
  constructor(private scheduledClassRepository: ScheduledClassRepository) {}

  async execute(
    scheduledClassId: string,
  ): Promise<GetScheduledClassByIdResponse> {
    try {
      const scheduledClass = await this.scheduledClassRepository.findById(
        scheduledClassId,
      )

      if (!scheduledClass) {
        throw new NotFoundException('ScheduledClass not found')
      }

      return {
        scheduledClass,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
