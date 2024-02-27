import { randomUUID } from 'crypto'

import { Replace } from 'src/helpers/Replace'

interface TestProps {
  testDate: string
  testHour: string
  place?: string | null
  status: 'APPROVED' | 'DISAPPROVED' | 'MARKED'
  studentId: string
  instructorId?: string | null
  category: 'THEORETICAL' | 'PRACTICAL'
  createdAt?: Date | null
}

export class Test {
  private _id: string
  private props: TestProps

  constructor(props: Replace<TestProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public set testDate(testDate: string) {
    this.props.testDate = testDate
  }

  public get testDate(): string {
    return this.props.testDate
  }

  public set testHour(testHour: string) {
    this.props.testHour = testHour
  }

  public get testHour(): string {
    return this.props.testHour
  }

  public set place(place: string | null) {
    this.props.place = place
  }

  public get place(): string | null {
    return this.props.place
  }

  public set status(status: 'APPROVED' | 'DISAPPROVED' | 'MARKED') {
    this.props.status = status
  }

  public get status(): 'APPROVED' | 'DISAPPROVED' | 'MARKED' {
    return this.props.status
  }

  public set studentId(studentId: string) {
    this.props.studentId = studentId
  }

  public get studentId(): string {
    return this.props.studentId
  }

  public set instructorId(instructorId: string) {
    this.props.instructorId = instructorId
  }

  public get instructorId(): string | null {
    return this.props.instructorId
  }

  public set category(category: 'THEORETICAL' | 'PRACTICAL') {
    this.props.category = category
  }

  public get category(): 'THEORETICAL' | 'PRACTICAL' {
    return this.props.category
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
