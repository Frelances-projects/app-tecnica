import { Payment } from '../../../application/entities/payment'

export class PaymentViewModel {
  static toHTTP(payment: any) {
    return {
      id: payment.id,
      method: payment.method,
      total: payment.total,
      createdAt: payment.createdAt,
      installments: payment.props.installments,
    }
  }
}
