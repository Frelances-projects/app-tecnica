import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Payment } from '../../entities/payment'
import { PaymentRepository } from '../../repositories/payment-repository'

interface GetManyPaymentsResponse {
  payments: Payment[]
}

@Injectable()
export class GetManyPayments {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(): Promise<GetManyPaymentsResponse> {
    try {
      const payments = await this.paymentRepository.findMany()

      return {
        payments,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
