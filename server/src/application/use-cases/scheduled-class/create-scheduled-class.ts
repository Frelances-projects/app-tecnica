import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

interface CreateScheduledClassRequest {
  schedulingDate?: string
  schedulingHour?: string
  status?: 'PENDING' | 'UNCHECKED' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  studentId: string
  classId: string
}

interface CreateScheduledClassResponse {
  scheduledClass: ScheduledClass
}

@Injectable()
export class CreateScheduledClass {
  constructor(private scheduledClassRepository: ScheduledClassRepository) {}

  async execute(
    request: CreateScheduledClassRequest,
  ): Promise<CreateScheduledClassResponse> {
    try {
      const { schedulingDate, schedulingHour, status, studentId, classId } =
        request

      const scheduledClass = new ScheduledClass({
        schedulingDate,
        schedulingHour,
        studentId,
        classId,
        status,
      })

      await this.scheduledClassRepository.create(scheduledClass)

      return {
        scheduledClass,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
