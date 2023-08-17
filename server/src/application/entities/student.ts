import { randomUUID } from 'node:crypto'

import { Replace } from '../../helpers/Replace'

interface StudentProps {
  name: string
  email: string
  number: number
  enrolledAt: string
  schoolId: string
  paymentId: string
  driverLicenseCategory: 'A' | 'B' | 'C' | 'ALL'
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

  public set paymentId(paymentId: string) {
    this.props.paymentId = paymentId
  }

  public get paymentId(): string {
    return this.props.paymentId
  }

  public set driverLicenseCategory(
    driverLicenseCategory: 'A' | 'B' | 'C' | 'ALL',
  ) {
    this.props.driverLicenseCategory = driverLicenseCategory
  }

  public get driverLicenseCategory(): 'A' | 'B' | 'C' | 'ALL' {
    return this.props.driverLicenseCategory
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
