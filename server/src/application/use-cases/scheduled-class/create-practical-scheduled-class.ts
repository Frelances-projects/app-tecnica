import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

import { CreateClass } from '../class/create-class'
import { GetClassByName } from '../class/get-class-by-name'

interface CreatePracticalScheduledClassRequest {
  schedulingDate: string
  schedulingHour: string
  status?: 'PENDING' | 'UNCHECKED' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  studentId: string
  className: string
  classDescription?: string
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
