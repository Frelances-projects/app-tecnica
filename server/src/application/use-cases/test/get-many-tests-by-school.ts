import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Test } from 'src/application/entities/tests'
import { TestRepository } from 'src/application/repositories/tests-repository'

interface GetManyTestsBySchoolResponse {
  test: Test[]
}

@Injectable()
export class GetManyTestsBySchool {
  constructor(private testRepository: TestRepository) {}

  async execute(schoolId: string): Promise<GetManyTestsBySchoolResponse> {
    try {
      const test = await this.testRepository.findManyBySchool(schoolId)

      return {
        test,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
