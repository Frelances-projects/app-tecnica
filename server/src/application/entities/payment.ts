import { randomUUID } from 'node:crypto'

import { Replace } from '../../helpers/Replace'

interface PaymentProps {
  method: 'INSTALLMENTS' | 'INCASH'
  total: number
  amountOfInstallments?: number | null
  amountOfInstallmentsPaid?: number | null
  amountOfRemainingInstallments?: number | null
  createdAt?: Date | null
}

export class Payment {
  private _id: string
  private props: PaymentProps

  constructor(props: Replace<PaymentProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }
  }

  public get id() {
    return this._id
  }

  public set method(method: 'INSTALLMENTS' | 'INCASH') {
    this.props.method = method
  }

  public get method(): 'INSTALLMENTS' | 'INCASH' {
    return this.props.method
  }

  public set total(total: number) {
    this.props.total = total
  }

  public get total(): number {
    return this.props.total
  }

  public set amountOfInstallments(amountOfInstallments: number | null) {
    this.props.amountOfInstallments = amountOfInstallments
  }

  public get amountOfInstallments(): number | null {
    return this.props.amountOfInstallments
  }

  public set amountOfInstallmentsPaid(amountOfInstallmentsPaid: number | null) {
    this.props.amountOfInstallmentsPaid = amountOfInstallmentsPaid
  }

  public get amountOfInstallmentsPaid(): number | null {
    return this.props.amountOfInstallmentsPaid
  }

  public set amountOfRemainingInstallments(
    amountOfRemainingInstallments: number | null,
  ) {
    this.props.amountOfRemainingInstallments = amountOfRemainingInstallments
  }

  public get amountOfRemainingInstallments(): number | null {
    return this.props.amountOfRemainingInstallments
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
