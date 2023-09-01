import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { InformationRepository } from '../../repositories/information-repository'
import { Information } from '../../entities/information'

interface GetManyInformationResponse {
  information: Information[]
}

@Injectable()
export class GetManyInformation {
  constructor(private informationRepository: InformationRepository) {}

  async execute(): Promise<GetManyInformationResponse> {
    try {
      const information = await this.informationRepository.findMany()

      return {
        information,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
