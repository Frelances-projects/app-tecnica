import { ScheduledClass } from '../entities/scheduled-class'

export abstract class ScheduledClassRepository {
  abstract create(scheduledClass: ScheduledClass): Promise<void>
  abstract findById(scheduledClassId: string): Promise<ScheduledClass | null>
  abstract findMany(): Promise<ScheduledClass[]>
  abstract findMany(): Promise<ScheduledClass[]>
  abstract findManyByStudentId(studentId: string): Promise<ScheduledClass[]>
  abstract findManyByClassId(classId: string): Promise<ScheduledClass[]>
  abstract save(scheduledClass: ScheduledClass): Promise<void>
}
