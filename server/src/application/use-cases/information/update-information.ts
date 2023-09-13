import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { InformationRepository } from '../../repositories/information-repository'
import { Information } from '../../entities/information'
import { GetInformationById } from './get-information-by-id'

interface UpdateInformationRequest {
  informationId: string
  name?: string
  description?: string
  date?: string
}

interface UpdateInformationResponse {
  information: Information
}

@Injectable()
export class UpdateInformation {
  constructor(
    private informationRepository: InformationRepository,
    private getInformationById: GetInformationById,
  ) {}

  async execute(
    request: UpdateInformationRequest,
  ): Promise<UpdateInformationResponse> {
    try {
      const { informationId, name, description, date } = request

      const { information } = await this.getInformationById.execute(
        informationId,
      )

      information.name = name ?? information.name
      information.description = description ?? information.description
      information.date = date ?? information.date

      await this.informationRepository.save(information)

      return {
        information,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
