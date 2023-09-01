import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { Class } from '../../entities/class'
import { ClassRepository } from '../../repositories/class-repository'

interface GetClassByIdResponse {
  class: Class
}

@Injectable()
export class GetClassById {
  constructor(private classRepository: ClassRepository) {}

  async execute(classId: string): Promise<GetClassByIdResponse> {
    try {
      const lesson = await this.classRepository.findById(classId)

      if (!lesson) {
        throw new NotFoundException('class not found')
      }

      return {
        class: lesson,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
