import { Class } from '../entities/class'

export abstract class ClassRepository {
  abstract create(lesson: Class): Promise<void>
  abstract save(lesson: Class): Promise<void>
  abstract delete(classId: string): Promise<void>
  abstract findById(classId: string): Promise<Class | null>
  abstract findByName(className: string): Promise<Class | null>
  abstract findByCode(code: number): Promise<Class | null>
  abstract findManyByCategory(
    category: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<Class[]>

  abstract findMany(): Promise<Class[]>
  abstract findManyByCategoryAndStudent(
    category: 'THEORETICAL' | 'PRACTICAL',
    studentId: string,
  ): Promise<Class[]>
}
