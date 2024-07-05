import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ScheduledClassRepository } from '../../repositories/scheduled-class-repository'
import { ScheduledClass } from '../../entities/scheduled-class'

interface GetManyScheduledClassesByClassRequest {
  schoolId: string
  categoryClass: 'THEORETICAL' | 'PRACTICAL'
  page?: number
  studentName?: string
  studentNumber?: number
  schedulingDate?: string
}

interface GetManyScheduledClassesByClassResponse {
  scheduledClasses: ScheduledClass[]
  total: number
}

@Injectable()
export class GetManyScheduledClassesBySchoolAndCategoryClass {
  constructor(private scheduledClassRepository: ScheduledClassRepository) {}

  async execute({
    schoolId,
    categoryClass,
    page,
    studentName,
    studentNumber,
    schedulingDate,
  }: GetManyScheduledClassesByClassRequest): Promise<GetManyScheduledClassesByClassResponse> {
    try {
      const { scheduledClasses, total } =
        await this.scheduledClassRepository.findManyBySchoolAndCategoryClass(
          schoolId,
          categoryClass,
          { page, studentName, studentNumber, schedulingDate },
        )

      return {
        scheduledClasses,
        total,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
