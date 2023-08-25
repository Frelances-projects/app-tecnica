import { randomUUID } from 'node:crypto'

import { Replace } from '../../helpers/Replace'

interface InstallmentsProps {
  valueOfAnInstallment: number
  amountOfInstallments: number
  amountOfInstallmentsPaid: number
  amountOfRemainingInstallments: number
  paymentId: string
  createdAt?: Date | null 
}

export class Installments {
  private _id: string
  private props: InstallmentsProps

  constructor(props: Replace<InstallmentsProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public set valueOfAnInstallment(valueOfAnInstallment: number) {
    this.props.valueOfAnInstallment = valueOfAnInstallment
  }

  public get valueOfAnInstallment(): number {
    return this.props.valueOfAnInstallment
  }

  public set amountOfInstallments(amountOfInstallments: number) {
    this.props.amountOfInstallments = amountOfInstallments
  }

  public get amountOfInstallments(): number {
    return this.props.amountOfInstallments
  }

  public set amountOfInstallmentsPaid(amountOfInstallmentsPaid: number) {
    this.props.amountOfInstallmentsPaid = amountOfInstallmentsPaid
  }

  public get amountOfInstallmentsPaid(): number {
    return this.props.amountOfInstallmentsPaid
  }

  public set amountOfRemainingInstallments(amountOfRemainingInstallments: number) {
    this.props.amountOfRemainingInstallments = amountOfRemainingInstallments
  }

  public get amountOfRemainingInstallments(): number {
    return this.props.amountOfRemainingInstallments
  }

  public set paymentId(paymentId: string) {
    this.props.paymentId = paymentId
  }

  public get paymentId(): string {
    return this.props.paymentId
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}