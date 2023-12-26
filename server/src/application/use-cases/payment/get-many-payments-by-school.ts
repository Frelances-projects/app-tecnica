import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Payment } from '../../entities/payment'
import { PaymentRepository } from '../../repositories/payment-repository'

interface GetManyPaymentsBySchoolResponse {
  payments: Payment[]
}

@Injectable()
export class GetManyPaymentsBySchool {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(schoolId: string): Promise<GetManyPaymentsBySchoolResponse> {
    try {
      const payments = await this.paymentRepository.findManyBySchool(schoolId)

      return {
        payments,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
