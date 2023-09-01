import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { InstallmentsRepository } from 'src/application/repositories/installments-repository'

import { Installments } from 'src/application/entities/installments'
import { GetInstallmentsById } from './get-installments-by-id'

interface UpdateInstallmentsRequest {
  id: string
  valueOfAnInstallment?: number
  amountOfInstallments?: number
  amountOfInstallmentsPaid?: number
  amountOfRemainingInstallments?: number
}

interface UpdateInstallmentsResponse {
  installments: Installments
}

@Injectable()
export class UpdateInstallments {
  constructor(
    private installmentsRepository: InstallmentsRepository,
    private getInstallmentsById: GetInstallmentsById,
  ) {}

  async execute(
    request: UpdateInstallmentsRequest,
  ): Promise<UpdateInstallmentsResponse> {
    try {
      const {
        id,
        amountOfInstallments,
        amountOfInstallmentsPaid,
        amountOfRemainingInstallments,
        valueOfAnInstallment,
      } = request

      const { installments } = await this.getInstallmentsById.execute(id)

      installments.amountOfInstallments =
        amountOfInstallments ?? installments.amountOfInstallments

      installments.amountOfInstallmentsPaid =
        amountOfInstallmentsPaid ?? installments.amountOfInstallmentsPaid

      installments.amountOfRemainingInstallments =
        amountOfRemainingInstallments ??
        installments.amountOfRemainingInstallments

      installments.valueOfAnInstallment =
        valueOfAnInstallment ?? installments.valueOfAnInstallment

      await this.installmentsRepository.save(installments)

      return {
        installments,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
