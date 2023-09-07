import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Payment } from 'src/application/entities/payment'
import { PaymentRepository } from 'src/application/repositories/payment-repository'

interface CreatePaymentRequest {
  method: 'INSTALLMENTS' | 'INCASH'
  amountOfInstallments?: number
  amountOfInstallmentsPaid?: number
  amountOfRemainingInstallments?: number
  total: number
}

interface CreatePaymentResponse {
  payment: Payment
}

@Injectable()
export class CreatePayment {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(request: CreatePaymentRequest): Promise<CreatePaymentResponse> {
    try {
      const {
        method,
        amountOfInstallments,
        amountOfRemainingInstallments,
        amountOfInstallmentsPaid,
        total,
      } = request

      const payment = new Payment({
        method,
        amountOfInstallments,
        amountOfRemainingInstallments,
        amountOfInstallmentsPaid,
        total: Number(total),
      })

      await this.paymentRepository.create(payment)

      return {
        payment,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
