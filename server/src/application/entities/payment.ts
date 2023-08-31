import { randomUUID } from 'node:crypto'

import { Replace } from '../../helpers/Replace'

interface PaymentProps {
  method: 'INSTALLMENTS' | 'INCASH'
  total: number
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

  public get createdAt(): Date {
    return this.props.createdAt
  }
}
