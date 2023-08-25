import { Test } from "../../../application/entities/tests";

export class TestViewModel {
  static toHTTP(test: Test) {
    return {
      id: test.id,
      category: test.category,
      status: test.status,
      testDate: test.testDate,
      testHour: test.testHour,
      createdAt: test.createdAt,
    };
  }
}
