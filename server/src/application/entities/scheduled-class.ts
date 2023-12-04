import { randomUUID } from 'node:crypto'

import { Replace } from '../../helpers/Replace'

interface ScheduledClassProps {
  schedulingDate?: string | null
  schedulingHour?: string | null
  status?:
    | 'PENDING'
    | 'UNCHECKED'
    | 'CONFIRMED'
    | 'CANCELED'
    | 'COMPLETED'
    | null
  studentId: string
  classId: string
  createdAt?: Date | null
}

export class ScheduledClass {
  private _id: string
  private props: ScheduledClassProps

  constructor(
    props: Replace<ScheduledClassProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      status: props.status ?? 'PENDING',
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public set schedulingDate(schedulingDate: string | null) {
    this.props.schedulingDate = schedulingDate
  }

  public get schedulingDate(): string | null {
    return this.props.schedulingDate
  }

  public set schedulingHour(schedulingHour: string | null) {
    this.props.schedulingHour = schedulingHour
  }

  public get schedulingHour(): string | null {
    return this.props.schedulingHour
  }

  public set status(
    status:
      | 'PENDING'
      | 'UNCHECKED'
      | 'CONFIRMED'
      | 'CANCELED'
      | 'COMPLETED'
      | null,
  ) {
    this.props.status = status
  }

  public get status():
    | 'PENDING'
    | 'UNCHECKED'
    | 'CONFIRMED'
    | 'CANCELED'
    | 'COMPLETED'
    | null {
    return this.props.status
  }

  public set studentId(studentId: string) {
    this.props.studentId = studentId
  }

  public get studentId(): string {
    return this.props.studentId
  }

  public set classId(classId: string) {
    this.props.classId = classId
  }

  public get classId(): string {
    return this.props.classId
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
