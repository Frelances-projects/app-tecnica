import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Test } from 'src/application/entities/tests'
import { TestRepository } from 'src/application/repositories/tests-repository'

interface CreateTestRequest {
  testDate: string
  testHour: string
  studentId: string
  status: 'APPROVED' | 'DISAPPROVED' | 'MARKED'
  category: 'THEORETICAL' | 'PRACTICAL'
}

interface CreateTestResponse {
  test: Test
}

@Injectable()
export class CreateTest {
  constructor(private testRepository: TestRepository) {}

  async execute(request: CreateTestRequest): Promise<CreateTestResponse> {
    try {
      const { testDate, testHour, studentId, status, category } = request
      const test = new Test({ testDate, testHour, studentId, status, category })

      await this.testRepository.create(test)
      return {
        test,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
