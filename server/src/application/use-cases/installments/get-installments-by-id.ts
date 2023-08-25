import { Injectable } from '@nestjs/common'

import { InstallmentsRepository } from 'src/application/repositories/installments-repository'
import { Installments } from 'src/application/entities/installments'

interface GetInstallmentsByIdResponse {
  installments: Installments
}

@Injectable()
export class GetInstallmentsById {
  constructor(private installmentsRepository: InstallmentsRepository) {}

  async execute(installmentsId: string): Promise<GetInstallmentsByIdResponse> {
    try {
      const installments = await this.installmentsRepository.findById(installmentsId)

      if (!installments) {
        throw new Error('installments not found')
      }

      return {
        installments,
      }
    } catch (error) {
      throw error
    }
  }
}
