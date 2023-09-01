import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { Payment } from 'src/application/entities/payment'
import { PaymentRepository } from 'src/application/repositories/payment-repository'
import { GetPaymentById } from './get-payment-by-id'

interface UpdatePaymentRequest {
  id: string
  method?: 'INSTALLMENTS' | 'INCASH'
  total?: number
}

interface UpdatePaymentResponse {
  payment: Payment
}

@Injectable()
export class UpdatePayment {
  constructor(
    private paymentRepository: PaymentRepository,
    private getPaymentById: GetPaymentById,
  ) {}

  async execute(request: UpdatePaymentRequest): Promise<UpdatePaymentResponse> {
    try {
      const { id, method, total } = request

      const { payment } = await this.getPaymentById.execute(id)

      payment.method = method ?? payment.method
      payment.total = total ?? payment.total

      await this.paymentRepository.save(payment)

      return {
        payment,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
