import { Test } from '../../../application/entities/tests'

export class TestViewModel {
  static toHTTP(test: any) {
    return {
      id: test.id,
      category: test.category,
      status: test.status,
      studentId: test.studentId,
      instructorId: test.instructorId,
      testDate: test.testDate,
      testHour: test.testHour,
      place: test.place,
      createdAt: test.createdAt,
      student: test.props.student ?? undefined,
      instructor: test.props.instructor ?? undefined,
    }
  }
}
