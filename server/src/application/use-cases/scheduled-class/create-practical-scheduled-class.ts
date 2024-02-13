import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

import { CreateClass } from '../class/create-class'
import { GetClassByName } from '../class/get-class-by-name'

interface CreatePracticalScheduledClassRequest {
  schedulingDate: string
  schedulingHour: string
  status?:
    | 'PENDING'
    | 'UNCHECKED'
    | 'CONFIRMED'
    | 'CANCELED'
    | 'COMPLETED'
    | 'MISSED'
  studentId: string
  className: string
  classDescription?: string
  vehicle?: string
  instructorId?: string
}

interface CreatePracticalScheduledClassResponse {
  scheduledClass: ScheduledClass
}

@Injectable()
export class CreatePracticalScheduledClass {
  constructor(
    private scheduledClassRepository: ScheduledClassRepository,
    private getClassByName: GetClassByName,
    private createClass: CreateClass,
  ) {}

  async execute(
    request: CreatePracticalScheduledClassRequest,
  ): Promise<CreatePracticalScheduledClassResponse> {
    try {
      const {
        schedulingDate,
        schedulingHour,
        status,
        studentId,
        className,
        classDescription,
        vehicle,
        instructorId,
      } = request

      const { class: lesson } = await this.getClassByName.execute(className)

      let scheduledClass: ScheduledClass

      if (lesson) {
        scheduledClass = new ScheduledClass({
          schedulingDate,
          schedulingHour,
          studentId,
          classId: lesson.id,
          status,
          vehicle,
          instructorId,
        })
      } else {
        const { class: lesson } = await this.createClass.execute({
          name: className,
          category: 'PRACTICAL',
          description: classDescription,
        })

        scheduledClass = new ScheduledClass({
          schedulingDate,
          schedulingHour,
          studentId,
          classId: lesson.id,
          status,
          vehicle,
          instructorId,
        })
      }

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
