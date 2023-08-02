import { Injectable } from '@nestjs/common';

import { InformationRepository } from '../../repositories/information-repository';
import { Information } from '../../entities/information';

interface GetInformationByIdResponse {
  information: Information;
}

@Injectable()
export class GetInformationById {
  constructor(private informationRepository: InformationRepository) {}

  async execute(informationId: string): Promise<GetInformationByIdResponse> {
    try {
      const information = await this.informationRepository.findById(
        informationId,
      );

      if (!information) {
        throw new Error('Information not found');
      }

      return {
        information,
      };
    } catch (error) {
      throw error;
    }
  }
}
