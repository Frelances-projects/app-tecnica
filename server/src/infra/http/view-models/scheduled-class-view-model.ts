import { ScheduledClass } from '../../../application/entities/scheduled-class'

export class ScheduledClassViewModel {
  static toHTTP(payment: ScheduledClass) {
    return {
      id: payment.id,
      schedulingDate: payment.schedulingDate,
      schedulingHour: payment.schedulingHour,
      status: payment.status,
      studentId: payment.studentId,
      classId: payment.classId,
      createdAt: payment.createdAt,
    }
  }
}
