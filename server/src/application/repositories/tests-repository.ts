import { Test } from '../entities/tests'

export abstract class TestRepository {
  abstract create(test: Test): Promise<void>
  abstract findById(testId: string): Promise<Test | null>
  abstract findMany(): Promise<Test[]>
  abstract findManyByStudent(studentId: string): Promise<Test[]>
  abstract findManyBySchool(schoolId: string): Promise<Test[]>
  abstract findManyByCategory(
    category: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<Test[]>

  abstract findManyBySchoolAndCategory(
    schoolId: string,
    category: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<Test[]>

  abstract save(test: Test): Promise<void>
  abstract delete(testId: string): Promise<void>
}
