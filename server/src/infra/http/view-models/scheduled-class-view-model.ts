import { ScheduledClass } from '../../../application/entities/scheduled-class'

export class ScheduledClassViewModel {
  static toHTTP(scheduledClass: any) {
    return {
      id: scheduledClass.id,
      schedulingDate: scheduledClass.schedulingDate,
      schedulingHour: scheduledClass.schedulingHour,
      status: scheduledClass.status,
      studentId: scheduledClass.studentId,
      classId: scheduledClass.classId,
      createdAt: scheduledClass.createdAt,
      class: scheduledClass.props.class,
      student: scheduledClass.props.student,
    }
  }
}
