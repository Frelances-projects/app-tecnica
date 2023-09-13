import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Class } from '../../entities/class'
import { ClassRepository } from '../../repositories/class-repository'

interface GetManyClassesByCategoryResponse {
  classes: Class[]
}

@Injectable()
export class GetManyClassesByCategory {
  constructor(private classRepository: ClassRepository) {}

  async execute(
    category: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<GetManyClassesByCategoryResponse> {
    try {
      const classes = await this.classRepository.findManyByCategory(category)

      return {
        classes,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
