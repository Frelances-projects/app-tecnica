import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Test } from 'src/application/entities/tests'
import { TestRepository } from '../../repositories/tests-repository'
import { GetTestById } from './get-test-by-id'

interface UpdateTestRequest {
  id: string
  testDate?: string
  testHour?: string
  place?: string
  instructorId?: string
  status?: 'APPROVED' | 'DISAPPROVED' | 'MARKED'
  category?: 'THEORETICAL' | 'PRACTICAL'
}

interface UpdateTestResponse {
  test: Test
}

@Injectable()
export class UpdateTest {
  constructor(
    private testRepository: TestRepository,
    private getTestById: GetTestById,
  ) {}

  async execute(request: UpdateTestRequest): Promise<UpdateTestResponse> {
    try {
      const { id, category, status, testDate, testHour, place, instructorId } =
        request

      const { test } = await this.getTestById.execute(id)

      test.category = category ?? test.category
      test.status = status ?? test.status
      test.testDate = testDate ?? test.testDate
      test.testHour = testHour ?? test.testHour
      test.place = place ?? test.place
      test.instructorId = instructorId ?? test.instructorId

      await this.testRepository.save(test)

      return {
        test,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
