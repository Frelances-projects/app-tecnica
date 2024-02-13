import { randomUUID } from 'node:crypto'

import { Replace } from '../../helpers/Replace'

export interface Installments {
  firstInstallment: number
  secondInstallment: number
  thirdInstallment?: number | null
  fourthInstallment?: number | null
}

interface DriverLicenseCategoryProps {
  name: string
  price: number
  schoolId: string
  installments: any
  vehicles?: string[] | null
  createdAt?: Date | null
}

export class DriverLicenseCategory {
  private _id: string
  private props: DriverLicenseCategoryProps

  constructor(
    props: Replace<DriverLicenseCategoryProps, { createdAt?: Date }>,
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

  public set price(price: number) {
    this.props.price = price
  }

  public get price(): number {
    return this.props.price
  }

  public set schoolId(schoolId: string | null) {
    this.props.schoolId = schoolId
  }

  public get schoolId(): string | null {
    return this.props.schoolId
  }

  public set installments(installments: Installments) {
    this.props.installments = installments
  }

  public get installments(): Installments {
    return this.props.installments
  }

  public set vehicles(vehicles: string[]) {
    this.props.vehicles = vehicles
  }

  public get vehicles(): string[] | null {
    return this.props.vehicles
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
