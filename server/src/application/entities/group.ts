import { randomUUID } from 'crypto'

import { Replace } from '../../helpers/Replace'

interface GroupProps {
  name: string
  createdAt?: Date | null
}

export class Group {
  private _id: string
  private props: GroupProps

  constructor(props: Replace<GroupProps, { createdAt?: Date }>, id?: string) {
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

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
