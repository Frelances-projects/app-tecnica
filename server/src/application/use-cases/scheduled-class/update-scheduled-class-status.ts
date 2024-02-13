import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'
import { GetScheduledClassById } from './get-scheduled-class-by-id'

interface UpdateScheduledClassStatusRequest {
  scheduledClassId: string
  status:
    | 'PENDING'
    | 'UNCHECKED'
    | 'CONFIRMED'
    | 'CANCELED'
    | 'COMPLETED'
    | 'MISSED'
}

interface UpdateScheduledClassStatusResponse {
  scheduledClass: ScheduledClass
}

@Injectable()
export class UpdateScheduledClassStatus {
  constructor(
    private scheduledClassRepository: ScheduledClassRepository,
    private getScheduledClassById: GetScheduledClassById,
  ) {}

  async execute(
    request: UpdateScheduledClassStatusRequest,
  ): Promise<UpdateScheduledClassStatusResponse> {
    try {
      const { scheduledClassId, status } = request

      const { scheduledClass } = await this.getScheduledClassById.execute(
        scheduledClassId,
      )

      scheduledClass.status = status ?? scheduledClass.status

      await this.scheduledClassRepository.save(scheduledClass)

      return {
        scheduledClass,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
