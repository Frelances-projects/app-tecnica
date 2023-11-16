import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Class } from '../../entities/class'
import { ClassRepository } from '../../repositories/class-repository'

interface GetClassByIdResponse {
  class: Class
}

@Injectable()
export class GetClassByName {
  constructor(private classRepository: ClassRepository) {}

  async execute(className: string): Promise<GetClassByIdResponse> {
    try {
      const lesson = await this.classRepository.findByName(className)

      if (!lesson) {
        return {
          class: null,
        }
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
