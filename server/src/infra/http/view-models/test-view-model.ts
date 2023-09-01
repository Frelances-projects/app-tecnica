import { Test } from '../../../application/entities/tests'

export class TestViewModel {
  static toHTTP(test: Test) {
    return {
      id: test.id,
      category: test.category,
      status: test.status,
      studentId: test.studentId,
      testDate: test.testDate,
      testHour: test.testHour,
      createdAt: test.createdAt,
    }
  }
}
