import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Test } from 'src/application/entities/tests'
import { TestRepository } from 'src/application/repositories/tests-repository'

interface GetManyTestsResponse {
  test: Test[]
}

@Injectable()
export class GetManyTests {
  constructor(private testRepository: TestRepository) {}

  async execute(): Promise<GetManyTestsResponse> {
    try {
      const test = await this.testRepository.findMany()

      return {
        test,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
