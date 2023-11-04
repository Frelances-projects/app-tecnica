import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { ClassRepository } from '../../repositories/class-repository'
import { GetClassById } from './get-class-by-id'

@Injectable()
export class DeleteClass {
  constructor(
    private classRepository: ClassRepository,
    private getClassById: GetClassById,
  ) {}

  async execute(classId: string): Promise<void> {
    try {
      const { class: lesson } = await this.getClassById.execute(classId)

      await this.classRepository.delete(lesson.id)
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
