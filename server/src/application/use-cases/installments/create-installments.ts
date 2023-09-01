import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { Installments } from 'src/application/entities/installments'
import { InstallmentsRepository } from 'src/application/repositories/installments-repository'

interface CreateInstallmentsRequest {
  valueOfAnInstallment: number
  amountOfInstallments: number
  amountOfInstallmentsPaid: number
  amountOfRemainingInstallments: number
  paymentId: string
}

interface CreateInstallmentsResponse {
  installments: Installments
}

@Injectable()
export class CreateInstallments {
  constructor(private installmentsRepository: InstallmentsRepository) {}

  async execute(
    request: CreateInstallmentsRequest,
  ): Promise<CreateInstallmentsResponse> {
    try {
      const {
        amountOfInstallments,
        amountOfInstallmentsPaid,
        amountOfRemainingInstallments,
        paymentId,
        valueOfAnInstallment,
      } = request

      const installments = new Installments({
        amountOfInstallments,
        amountOfInstallmentsPaid,
        amountOfRemainingInstallments,
        valueOfAnInstallment,
        paymentId,
      })

      await this.installmentsRepository.create(installments)

      return {
        installments,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
