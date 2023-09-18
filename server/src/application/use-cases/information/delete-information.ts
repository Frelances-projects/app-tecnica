import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'

import { InformationRepository } from '../../repositories/information-repository'

@Injectable()
export class DeleteInformation {
  constructor(private informationRepository: InformationRepository) {}

  async execute(informationId: string): Promise<void> {
    try {
      const information = await this.informationRepository.findById(
        informationId,
      )

      if (!information) {
        throw new NotFoundException('Information not found')
      }

      await this.informationRepository.delete(informationId)
    } catch (error) {
      if (error) throw error
      throw new InternalServerErrorException()
    }
  }
}
