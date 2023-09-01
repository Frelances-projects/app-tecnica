import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { Test } from 'src/application/entities/tests'
import { TestRepository } from '../../repositories/tests-repository'

interface GetTestByIdResponse {
  test: Test
}

@Injectable()
export class GetTestById {
  constructor(private testRepository: TestRepository) {}

  async execute(testId: string): Promise<GetTestByIdResponse> {
    try {
      const test = await this.testRepository.findById(testId)

      if (!test) throw new NotFoundException('test not found')

      return {
        test,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
