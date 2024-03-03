import { randomUUID } from 'node:crypto'

import { Replace } from '../../helpers/Replace'

interface UserProps {
  name: string
  email: string
  password: string
  schoolId: string
  function: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
  token?: string | null
  imtId?: string | null
  createdAt?: Date | null
}

export class User {
  private _id: string
  private props: UserProps

  constructor(props: Replace<UserProps, { createdAt?: Date }>, id?: string) {
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

  public set email(email: string) {
    this.props.email = email
  }

  public get email(): string {
    return this.props.email
  }

  public set password(password: string) {
    this.props.password = password
  }

  public get password(): string | null {
    return this.props.password
  }

  public set schoolId(schoolId: string) {
    this.props.schoolId = schoolId
  }

  public get schoolId(): string {
    return this.props.schoolId
  }

  public set userFunction(userFunction: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR') {
    this.props.function = userFunction
  }

  public get userFunction(): 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR' {
    return this.props.function
  }

  public set token(token: string) {
    this.props.token = token
  }

  public get token(): string {
    return this.props.token
  }

  public set imtId(imtId: string) {
    this.props.imtId = imtId
  }

  public get imtId(): string {
    return this.props.imtId
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
