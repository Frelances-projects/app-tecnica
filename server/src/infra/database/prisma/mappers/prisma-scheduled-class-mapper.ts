import { ScheduledClass as RawScheduledClass } from '@prisma/client'

import { ScheduledClass } from 'src/application/entities/scheduled-class'

export class PrismaScheduledClassMapper {
  static toPrisma(scheduledClass: ScheduledClass) {
    return {
      id: scheduledClass.id,
      schedulingDate: scheduledClass.schedulingDate,
      schedulingHour: scheduledClass.schedulingHour,
      status: scheduledClass.status,
      studentId: scheduledClass.studentId,
      classId: scheduledClass.classId,
      createdAt: scheduledClass.createdAt,
    }
  }

  static toDomain(raw: RawScheduledClass): ScheduledClass {
    return new ScheduledClass(
      {
        schedulingDate: raw.schedulingDate,
        schedulingHour: raw.schedulingHour,
        status: raw.status,
        studentId: raw.studentId,
        classId: raw.classId,
        createdAt: raw.createdAt,
        ...raw,
      },
      raw.id,
    )
  }
}
