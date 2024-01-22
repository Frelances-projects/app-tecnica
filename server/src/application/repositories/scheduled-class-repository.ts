import { ScheduledClass } from '../entities/scheduled-class'

export abstract class ScheduledClassRepository {
  abstract create(scheduledClass: ScheduledClass): Promise<void>
  abstract createMany(scheduledClasses: ScheduledClass[]): Promise<void>
  abstract findById(scheduledClassId: string): Promise<ScheduledClass | null>
  abstract findMany(): Promise<ScheduledClass[]>
  abstract findManyBySchoolId(schoolId: string): Promise<ScheduledClass[]>
  abstract findManyByStudentId(studentId: string): Promise<ScheduledClass[]>
  abstract findManyByClassId(classId: string): Promise<ScheduledClass[]>
  abstract findManyByCategoryClass(
    categoryClass: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<ScheduledClass[]>

  abstract findManyBySchoolAndCategoryClass(
    schoolId: string,
    categoryClass: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<ScheduledClass[]>

  abstract findManyByStudentAndCategoryClass(
    studentId: string,
    categoryClass: 'THEORETICAL' | 'PRACTICAL',
  ): Promise<ScheduledClass[]>

  abstract save(scheduledClass: ScheduledClass): Promise<void>
  abstract delete(scheduledClassId: string): Promise<void>
}
