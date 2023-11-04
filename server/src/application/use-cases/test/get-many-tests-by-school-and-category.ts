import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Test } from 'src/application/entities/tests'
import { TestRepository } from 'src/application/repositories/tests-repository'

interface GetManyTestsBySchoolAndCategoryResponse {
  test: Test[]
}

@Injectable()
export class GetManyTestsBySchoolAndCategory {
  constructor(private testRepository: TestRepository) {}

  async execute(
    schoolId: string,
    category: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<GetManyTestsBySchoolAndCategoryResponse> {
    try {
      const test = await this.testRepository.findManyBySchoolAndCategory(
        schoolId,
        category,
      )

      return {
        test,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
