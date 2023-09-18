import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { InformationRepository } from '../../repositories/information-repository'
import { Information } from '../../entities/information'

interface CreateInformationRequest {
  name: string
  description: string
  date: string
  schoolId: string
}

interface CreateInformationResponse {
  information: Information
}

@Injectable()
export class CreateInformation {
  constructor(private informationRepository: InformationRepository) {}

  async execute(
    request: CreateInformationRequest,
  ): Promise<CreateInformationResponse> {
    try {
      const { name, description, date, schoolId } = request

      const information = new Information({ name, description, date, schoolId })

      await this.informationRepository.create(information)

      return {
        information,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
