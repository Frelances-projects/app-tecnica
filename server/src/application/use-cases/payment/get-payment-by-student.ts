import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { Payment } from 'src/application/entities/payment'
import { PaymentRepository } from 'src/application/repositories/payment-repository'

interface GetPaymentByStudentResponse {
  payment: Payment
}

@Injectable()
export class GetPaymentByStudent {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(studentId: string): Promise<GetPaymentByStudentResponse> {
    try {
      const payment = await this.paymentRepository.findByStudent(studentId)

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
