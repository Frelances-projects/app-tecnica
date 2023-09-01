import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Class } from '../../entities/class'
import { ClassRepository } from '../../repositories/class-repository'

interface GetManyClassesResponse {
  classes: Class[]
}

@Injectable()
export class GetManyClasses {
  constructor(private classRepository: ClassRepository) {}

  async execute(): Promise<GetManyClassesResponse> {
    try {
      const classes = await this.classRepository.findMany()

      return {
        classes,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
