import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Test } from 'src/application/entities/tests'
import { TestRepository } from 'src/application/repositories/tests-repository'

interface GetManyTestsByCategoryResponse {
  test: Test[]
}

@Injectable()
export class GetManyTestsByCategory {
  constructor(private testRepository: TestRepository) {}

  async execute(
    category: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<GetManyTestsByCategoryResponse> {
    try {
      const test = await this.testRepository.findManyByCategory(category)

      return {
        test,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
