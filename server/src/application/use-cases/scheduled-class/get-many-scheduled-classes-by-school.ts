import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

interface GetManyScheduledClassesByClassResponse {
  scheduledClasses: ScheduledClass[]
}

@Injectable()
export class GetManyScheduledClassesBySchool {
  constructor(private scheduledClassRepository: ScheduledClassRepository) {}

  async execute(
    schoolId: string,
  ): Promise<GetManyScheduledClassesByClassResponse> {
    try {
      const scheduledClasses =
        await this.scheduledClassRepository.findManyBySchoolId(schoolId)

      return {
        scheduledClasses,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
