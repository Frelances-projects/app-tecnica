import { Test } from '../../../application/entities/tests'

export class TestViewModel {
  static toHTTP(test: any) {
    return {
      id: test.id,
      category: test.category,
      status: test.status,
      studentId: test.studentId,
      testDate: test.testDate,
      testHour: test.testHour,
      place: test.place,
      createdAt: test.createdAt,
      student: test.props.student ?? undefined,
    }
  }
}
