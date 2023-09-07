import { randomUUID } from 'node:crypto'

import { Replace } from '../../helpers/Replace'

interface StudentProps {
  name: string
  email: string
  password?: string | null
  number: number
  enrolledAt: string
  schoolId: string
  paymentId?: string | null
  token?: string | null
  driverLicenseCategoryId: string
  createdAt?: Date | null
}

export class Student {
  private _id: string
  private props: StudentProps

  constructor(props: Replace<StudentProps, { createdAt?: Date }>, id?: string) {
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

  public set password(password: string | null) {
    this.props.password = password
  }

  public get password(): string | null {
    return this.props.password
  }

  public set number(number: number) {
    this.props.number = number
  }

  public get number(): number {
    return this.props.number
  }

  public set enrolledAt(enrolledAt: string) {
    this.props.enrolledAt = enrolledAt
  }

  public get enrolledAt(): string {
    return this.props.enrolledAt
  }

  public set schoolId(schoolId: string) {
    this.props.schoolId = schoolId
  }

  public get schoolId(): string {
    return this.props.schoolId
  }

  public set paymentId(paymentId: string | null) {
    this.props.paymentId = paymentId
  }

  public get paymentId(): string | null {
    return this.props.paymentId
  }

  public set token(token: string) {
    this.props.token = token
  }

  public get token(): string {
    return this.props.token
  }

  public set driverLicenseCategoryId(driverLicenseCategoryId: string) {
    this.props.driverLicenseCategoryId = driverLicenseCategoryId
  }

  public get driverLicenseCategoryId(): string {
    return this.props.driverLicenseCategoryId
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
