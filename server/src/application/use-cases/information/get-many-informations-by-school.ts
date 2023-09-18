import { Injectable, InternalServerErrorException } from '@nestjs/common'

import { InformationRepository } from '../../repositories/information-repository'
import { Information } from '../../entities/information'

interface GetManyInformationResponse {
  information: Information[]
}

@Injectable()
export class GetManyInformationBySchool {
  constructor(private informationRepository: InformationRepository) {}

  async execute(schoolId: string): Promise<GetManyInformationResponse> {
    try {
      const information = await this.informationRepository.findManyBySchool(
        schoolId,
      )

      return {
        information,
      }
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
