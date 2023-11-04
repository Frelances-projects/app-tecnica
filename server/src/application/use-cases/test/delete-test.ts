import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { TestRepository } from '../../repositories/tests-repository'
import { GetTestById } from './get-test-by-id'

@Injectable()
export class DeleteTest {
  constructor(
    private testRepository: TestRepository,
    private getTestById: GetTestById,
  ) {}

  async execute(testId: string): Promise<void> {
    try {
      const { test } = await this.getTestById.execute(testId)

      await this.testRepository.delete(test.id)
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
