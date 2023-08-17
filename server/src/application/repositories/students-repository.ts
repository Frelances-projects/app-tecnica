import { Student } from '../entities/student'

export abstract class StudentsRepository {
  abstract create(student: Student): Promise<void>
  abstract findById(studentId: string): Promise<Student | null>
  abstract findByEmail(email: string): Promise<Student | null>
  abstract findByNumber(number: number): Promise<Student | null>
  abstract findMany(): Promise<Student[]>
  abstract save(student: Student): Promise<void>
}
