import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { GetScheduledClassById } from './get-scheduled-class-by-id'
import { ScheduledClassRepository } from 'src/application/repositories/scheduled-class-repository'

@Injectable()
export class DeleteScheduledClass {
  constructor(
    private scheduledClassRepository: ScheduledClassRepository,
    private getScheduledClassById: GetScheduledClassById,
  ) {}

  async execute(studentClassId: string): Promise<void> {
    try {
      const { scheduledClass } = await this.getScheduledClassById.execute(
        studentClassId,
      )

      await this.scheduledClassRepository.delete(scheduledClass.id)
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
