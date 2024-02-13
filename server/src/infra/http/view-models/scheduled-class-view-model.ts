import { ScheduledClass } from '../../../application/entities/scheduled-class'

export class ScheduledClassViewModel {
  static toHTTP(scheduledClass: any) {
    return {
      id: scheduledClass.id,
      schedulingDate: scheduledClass.schedulingDate,
      schedulingHour: scheduledClass.schedulingHour,
      justification: scheduledClass.justification,
      vehicle: scheduledClass.vehicle,
      status: scheduledClass.status,
      studentId: scheduledClass.studentId,
      classId: scheduledClass.classId,
      instructorId: scheduledClass.instructorId,
      createdAt: scheduledClass.createdAt,
      class: scheduledClass.props.class ?? undefined,
      instructor: scheduledClass.props.instructor ?? undefined,
      student: scheduledClass.props.student ?? undefined,
    }
  }
}
