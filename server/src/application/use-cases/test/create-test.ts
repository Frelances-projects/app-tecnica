import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Test } from 'src/application/entities/tests'
import { TestRepository } from 'src/application/repositories/tests-repository'

interface CreateTestRequest {
  testDate: string
  testHour: string
  place?: string
  studentId: string
  instructorId?: string
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
      const {
        testDate,
        testHour,
        place,
        studentId,
        status,
        category,
        instructorId,
      } = request
      const test = new Test({
        testDate,
        testHour,
        place,
        studentId,
        status,
        category,
        instructorId,
      })

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
