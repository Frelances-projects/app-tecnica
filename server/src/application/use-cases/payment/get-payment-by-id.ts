import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { Payment } from 'src/application/entities/payment'
import { PaymentRepository } from 'src/application/repositories/payment-repository'

interface GetPaymentByIdResponse {
  payment: Payment
}

@Injectable()
export class GetPaymentById {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(paymentId: string): Promise<GetPaymentByIdResponse> {
    try {
      const payment = await this.paymentRepository.findById(paymentId)

      if (!payment) throw new NotFoundException('payment not found')

      return {
        payment,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
