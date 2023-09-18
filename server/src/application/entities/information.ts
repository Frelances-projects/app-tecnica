import { randomUUID } from 'node:crypto'

import { Replace } from '../../helpers/Replace'

interface InformationProps {
  name: string
  description: string
  date: string
  schoolId: string
  createdAt?: Date | null
}

export class Information {
  private _id: string
  private props: InformationProps

  constructor(
    props: Replace<InformationProps, { createdAt?: Date }>,
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

  public set name(name: string) {
    this.props.name = name
  }

  public get name(): string {
    return this.props.name
  }

  public set description(description: string) {
    this.props.description = description
  }

  public get description(): string {
    return this.props.description
  }

  public set date(date: string) {
    this.props.date = date
  }

  public get date(): string {
    return this.props.date
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
