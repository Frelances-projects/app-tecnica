import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

interface GetManyScheduledClassesByStudentResponse {
  scheduledClasses: ScheduledClass[]
}

@Injectable()
export class GetManyScheduledClassesByStudent {
  constructor(private scheduledClassRepository: ScheduledClassRepository) {}

  async execute(
    studentId: string,
  ): Promise<GetManyScheduledClassesByStudentResponse> {
    try {
      const scheduledClasses =
        await this.scheduledClassRepository.findManyByStudentId(studentId)

      return {
        scheduledClasses,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
