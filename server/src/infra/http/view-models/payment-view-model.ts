import { Payment } from '../../../application/entities/payment'

export class PaymentViewModel {
  static toHTTP(payment: any) {
    return {
      id: payment.id,
      method: payment.method,
      total: payment.total,
      amountOfInstallments: payment.amountOfInstallments,
      amountOfInstallmentsPaid: payment.amountOfInstallmentsPaid,
      amountOfRemainingInstallments: payment.amountOfRemainingInstallments,
      createdAt: payment.createdAt,
      installments: payment.props.installments,
      student: payment.props.student,
    }
  }
}
