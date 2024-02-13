import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClass } from '../../entities/scheduled-class'
import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'

import { GetClassByName } from '../class/get-class-by-name'
import { CreateClass } from '../class/create-class'

interface CreateManyScheduledClassRequest {
  totalClasses: number
  studentId: string
  vehicle?: string
  instructorId?: string
}

interface CreateManyScheduledClassResponse {
  scheduledClasses: ScheduledClass[]
}

@Injectable()
export class CreateManyScheduledClasses {
  constructor(
    private scheduledClassRepository: ScheduledClassRepository,
    private getClassByName: GetClassByName,
    private createClass: CreateClass,
  ) {}

  async execute(
    request: CreateManyScheduledClassRequest,
  ): Promise<CreateManyScheduledClassResponse> {
    try {
      const { studentId, totalClasses, vehicle, instructorId } = request

      let lessonName = 'Aula'
      const scheduledClasses: ScheduledClass[] = []

      for (let i = 1; i <= totalClasses; i++) {
        lessonName = `Aula ${i}`

        const { class: lesson } = await this.getClassByName.execute(lessonName)

        if (lesson && lesson.category === 'PRACTICAL') {
          const scheduledClass = new ScheduledClass({
            classId: lesson.id,
            studentId,
            status: 'COMPLETED',
            vehicle,
            instructorId,
          })

          scheduledClasses.push(scheduledClass)
        } else {
          const { class: newLesson } = await this.createClass.execute({
            name: lessonName,
            category: 'PRACTICAL',
          })

          const scheduledClass = new ScheduledClass({
            classId: newLesson.id,
            studentId,
            status: 'COMPLETED',
            vehicle,
            instructorId,
          })

          scheduledClasses.push(scheduledClass)
        }
      }

      await this.scheduledClassRepository.createMany(scheduledClasses)

      return {
        scheduledClasses,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
