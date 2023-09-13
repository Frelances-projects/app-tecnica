import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Test } from 'src/application/entities/tests'
import { TestRepository } from 'src/application/repositories/tests-repository'

interface GetManyTestsByStudentResponse {
  test: Test[]
}

@Injectable()
export class GetManyTestsByStudent {
  constructor(private testRepository: TestRepository) {}

  async execute(studentId: string): Promise<GetManyTestsByStudentResponse> {
    try {
      const test = await this.testRepository.findManyByStudent(studentId)

      return {
        test,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
