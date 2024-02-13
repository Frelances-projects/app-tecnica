import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'
import { GetScheduledClassById } from './get-scheduled-class-by-id'

interface UpdateScheduledClassRequest {
  scheduledClassId: string
  schedulingDate?: string
  schedulingHour?: string
  justification?: string
  vehicle?: string
  classId?: string
  instructorId?: string
  status?:
    | 'PENDING'
    | 'UNCHECKED'
    | 'CONFIRMED'
    | 'CANCELED'
    | 'COMPLETED'
    | 'MISSED'
}

interface UpdateScheduledClassResponse {
  scheduledClass: ScheduledClass
}

@Injectable()
export class UpdateScheduledClass {
  constructor(
    private scheduledClassRepository: ScheduledClassRepository,
    private getScheduledClassById: GetScheduledClassById,
  ) {}

  async execute(
    request: UpdateScheduledClassRequest,
  ): Promise<UpdateScheduledClassResponse> {
    try {
      const {
        scheduledClassId,
        schedulingDate,
        schedulingHour,
        justification,
        classId,
        status,
        vehicle,
        instructorId,
      } = request

      const { scheduledClass } = await this.getScheduledClassById.execute(
        scheduledClassId,
      )

      scheduledClass.schedulingDate =
        schedulingDate ?? scheduledClass.schedulingDate
      scheduledClass.schedulingHour =
        schedulingHour ?? scheduledClass.schedulingHour
      scheduledClass.justification =
        justification ?? scheduledClass.justification
      scheduledClass.classId = classId ?? scheduledClass.classId
      scheduledClass.status = status ?? scheduledClass.status
      scheduledClass.vehicle = vehicle ?? scheduledClass.vehicle
      scheduledClass.instructorId = instructorId ?? scheduledClass.instructorId

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
