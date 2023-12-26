import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { PaymentRepository } from '../../repositories/payment-repository'
import { GetPaymentById } from './get-payment-by-id'

@Injectable()
export class DeletePayment {
  constructor(
    private paymentRepository: PaymentRepository,
    private getPaymentById: GetPaymentById,
  ) {}

  async execute(paymentId: string): Promise<void> {
    try {
      const { payment } = await this.getPaymentById.execute(paymentId)

      await this.paymentRepository.delete(payment.id)
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
