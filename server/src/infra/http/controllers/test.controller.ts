import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'

import { CreateTest } from 'src/application/use-cases/test/create-test'
import { GetManyTests } from 'src/application/use-cases/test/get-many-tests'
import { GetManyTestsByStudent } from 'src/application/use-cases/test/get-many-tests-by-student'
import { GetTestById } from 'src/application/use-cases/test/get-test-by-id'
import { UpdateTest } from 'src/application/use-cases/test/update-test'

import { TestViewModel } from '../view-models/test-view-model'

import { CreateTestBody } from '../dtos/test/create-test-body'
import { UpdateTestBody } from '../dtos/test/update-test-body'

@Controller('test')
export class TestController {
  constructor(
    private createTest: CreateTest,
    private updateTest: UpdateTest,
    private getTestById: GetTestById,
    private getManyTests: GetManyTests,
    private getManyTestsByStudent: GetManyTestsByStudent,
  ) {}

  @Get(':testId')
  async getById(@Param('testId') testId: string) {
    const { test } = await this.getTestById.execute(testId)

    return {
      test: TestViewModel.toHTTP(test),
    }
  }

  @Get()
  async getMany() {
    const { test } = await this.getManyTests.execute()

    const testToHTTP = test.map((test) => TestViewModel.toHTTP(test))

    return {
      test: testToHTTP,
    }
  }

  @Get('/student/:studentId')
  async getManyByStudent(@Param('studentId') studentId: string) {
    const { test } = await this.getManyTestsByStudent.execute(studentId)

    const testToHTTP = test.map((test) => TestViewModel.toHTTP(test))

    return {
      test: testToHTTP,
    }
  }

  @Post(':studentId')
  async create(
    @Param('studentId') studentId: string,
    @Body() body: CreateTestBody,
  ) {
    const { test } = await this.createTest.execute({ ...body, studentId })

    return {
      test: TestViewModel.toHTTP(test),
    }
  }

  @Put(':testId')
  async update(@Param('testId') testId: string, @Body() body: UpdateTestBody) {
    const { testDate, testHour } = body

    const { test } = await this.updateTest.execute({
      id: testId,
      testDate,
      testHour,
    })

    return {
      test: TestViewModel.toHTTP(test),
    }
  }
}
