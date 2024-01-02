import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

import { CreateTest } from 'src/application/use-cases/test/create-test'
import { GetManyTests } from 'src/application/use-cases/test/get-many-tests'
import { GetManyTestsByStudent } from 'src/application/use-cases/test/get-many-tests-by-student'
import { GetManyTestsBySchool } from 'src/application/use-cases/test/get-many-tests-by-school'
import { GetManyTestsByCategory } from 'src/application/use-cases/test/get-many-tests-by-category'
import { GetManyTestsBySchoolAndCategory } from 'src/application/use-cases/test/get-many-tests-by-school-and-category'
import { GetTestById } from 'src/application/use-cases/test/get-test-by-id'
import { UpdateTest } from 'src/application/use-cases/test/update-test'
import { DeleteTest } from 'src/application/use-cases/test/delete-test'

import { TestViewModel } from '../view-models/test-view-model'

import { CreateTestBody } from '../dtos/test/create-test-body'
import { UpdateTestBody } from '../dtos/test/update-test-body'

import { PushNotificationService } from 'src/push-notification/push-notification.service'

@Controller('test')
export class TestController {
  constructor(
    private createTest: CreateTest,
    private updateTest: UpdateTest,
    private deleteTest: DeleteTest,
    private getTestById: GetTestById,
    private getManyTests: GetManyTests,
    private getManyTestsByStudent: GetManyTestsByStudent,
    private getManyTestsBySchool: GetManyTestsBySchool,
    private getManyTestsByCategory: GetManyTestsByCategory,
    private getManyTestsBySchoolAndCategory: GetManyTestsBySchoolAndCategory,
    private pushNotificationService: PushNotificationService,
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

  @Get('/school/:schoolId')
  async getManyBySchool(@Param('schoolId') schoolId: string) {
    const { test } = await this.getManyTestsBySchool.execute(schoolId)

    const testToHTTP = test.map((test) => TestViewModel.toHTTP(test))

    return {
      test: testToHTTP,
    }
  }

  @Get('/categories/category')
  async getManyByCategory(
    @Query('category') category: 'THEORETICAL' | 'PRACTICAL',
  ) {
    const { test } = await this.getManyTestsByCategory.execute(category)

    const testToHTTP = test.map((test) => TestViewModel.toHTTP(test))

    return {
      test: testToHTTP,
    }
  }

  @Get('/school/:schoolId/category')
  async getManyBySchoolAndCategory(
    @Param('schoolId') schoolId: string,
    @Query('category') category: 'THEORETICAL' | 'PRACTICAL',
  ) {
    const { test } = await this.getManyTestsBySchoolAndCategory.execute(
      schoolId,
      category,
    )

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

    await Promise.all([
      // this.pushNotificationService.sendNotificationToStudent({
      //   studentId,
      //   title:
      //     test.category === 'THEORETICAL'
      //       ? 'O teu exame de código foi marcado para:'
      //       : 'O teu exame de condução foi marcado para:',
      //   body: `${format(new Date(test.testDate), 'PPP', { locale: pt })} ás ${
      //     test.testHour
      //   }`,
      // }),

      this.pushNotificationService.sendSmsToStudent({
        studentId,
        body:
          test.category === 'THEORETICAL'
            ? `O teu exame de código foi marcado para: ${format(
                new Date(test.testDate),
                'PPP',
                { locale: pt },
              )} ás ${test.testHour}`
            : `O teu exame de condução foi marcado para: ${format(
                new Date(test.testDate),
                'PPP',
                { locale: pt },
              )} ás ${test.testHour}`,
      }),
    ])

    return {
      test: TestViewModel.toHTTP(test),
    }
  }

  @Put(':testId')
  async update(@Param('testId') testId: string, @Body() body: UpdateTestBody) {
    const { testDate, testHour, status } = body

    const { test } = await this.updateTest.execute({
      id: testId,
      testDate,
      testHour,
      status,
    })

    return {
      test: TestViewModel.toHTTP(test),
    }
  }

  @Delete(':testId')
  async delete(@Param('testId') testId: string) {
    await this.deleteTest.execute(testId)
  }
}
