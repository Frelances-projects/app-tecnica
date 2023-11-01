import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Class } from '../../entities/class'
import { ClassRepository } from '../../repositories/class-repository'

interface GetClassByIdResponse {
  class: Class
}

@Injectable()
export class GetClassByCode {
  constructor(private classRepository: ClassRepository) {}

  async execute(code: number): Promise<GetClassByIdResponse> {
    try {
      const lesson = await this.classRepository.findByCode(code)

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
