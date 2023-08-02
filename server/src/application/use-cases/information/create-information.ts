import { Injectable } from '@nestjs/common';

import { InformationRepository } from '../../repositories/information-repository';
import { Information } from '../../entities/information';

interface CreateInformationRequest {
  name: string;
  description: string;
}

interface CreateInformationResponse {
  information: Information;
}

@Injectable()
export class CreateInformation {
  constructor(private informationRepository: InformationRepository) {}

  async execute(
    request: CreateInformationRequest,
  ): Promise<CreateInformationResponse> {
    try {
      const { name, description } = request;

      const information = new Information({ name, description });

      await this.informationRepository.create(information);

      return {
        information,
      };
    } catch (error) {
      throw error;
    }
  }
}
