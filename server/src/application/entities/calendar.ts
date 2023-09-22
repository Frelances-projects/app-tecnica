import { randomUUID } from 'node:crypto'

import { Replace } from '../../helpers/Replace'

interface CalendarProps {
  fileUrl: string
  schoolId: string
  createdAt?: Date | null
}

export class Calendar {
  private _id: string
  private props: CalendarProps

  constructor(
    props: Replace<CalendarProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public set fileUrl(fileUrl: string) {
    this.props.fileUrl = fileUrl
  }

  public get fileUrl(): string {
    return this.props.fileUrl
  }

  public set schoolId(schoolId: string) {
    this.props.schoolId = schoolId
  }

  public get schoolId(): string {
    return this.props.schoolId
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
