import { randomUUID } from 'node:crypto'

import { Replace } from '../../helpers/Replace'

interface ClassProps {
  name: string
  code: number
  description?: string | null
  category?: 'THEORETICAL' | 'PRACTICAL' | null
  createdAt?: Date | null
}

export class Class {
  private _id: string
  private props: ClassProps

  constructor(props: Replace<ClassProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      category: props.category ?? 'THEORETICAL',
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

  public set code(code: number) {
    this.props.code = code
  }

  public get code(): number {
    return this.props.code
  }

  public set description(description: string | null) {
    this.props.description = description
  }

  public get description(): string | null {
    return this.props.description
  }

  public set category(category: 'THEORETICAL' | 'PRACTICAL' | null) {
    this.props.category = category
  }

  public get category(): 'THEORETICAL' | 'PRACTICAL' | null {
    return this.props.category
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
