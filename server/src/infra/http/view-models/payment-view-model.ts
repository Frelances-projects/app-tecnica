import { Payment } from "../../../application/entities/payment";

export class PaymentViewModel {
  static toHTTP(payment: Payment) {
    return {
      id: payment.id,
      method: payment.method,
      total: payment.total,
      createdAt: payment.createdAt,
    };
  }
}
