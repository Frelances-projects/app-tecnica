import { Payment } from '../entities/payment'

export abstract class PaymentRepository {
  abstract create(payment: Payment): Promise<void>
  abstract findById(paymentId: string): Promise<Payment | null>
  abstract save(payment: Payment): Promise<void>
}
