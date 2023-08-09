import { Body, Controller, Get, Param, Put, Post } from '@nestjs/common';

import { CreateInformation } from '../../../application/use-cases/information/create-information';
import { GetInformationById } from '../../../application/use-cases/information/get-information-by-id';
import { UpdateInformation } from '../../../application/use-cases/information/update-information';
import { GetManyInformation } from '../../../application/use-cases/information/get-many-informations';

import { InformationViewModel } from '../view-models/information-view-model';

import { CreateInformationBody } from '../dtos/information/create-information-body';
import { UpdateInformationBody } from '../dtos/information/update-information-body';

@Controller('information')
export class InformationController {
  constructor(
    private createInformation: CreateInformation,
    private getInformationById: GetInformationById,
    private updateInformation: UpdateInformation,
    private getManyInformation: GetManyInformation,
  ) {}

  @Get(':informationId')
  async getById(@Param('informationId') informationId: string) {
    const { information } = await this.getInformationById.execute(
      informationId,
    );

    return {
      information: InformationViewModel.toHTTP(information),
    };
  }

  @Get()
  async getMany() {
    const { information } = await this.getManyInformation.execute();

    const informationToHTTP = information.map((info) =>
      InformationViewModel.toHTTP(info),
    );

    return {
      information: informationToHTTP,
    };
  }

  @Post()
  async create(@Body() body: CreateInformationBody) {
    const { information } = await this.createInformation.execute(body);

    return {
      information: InformationViewModel.toHTTP(information),
    };
  }

  @Put(':informationId')
  async update(
    @Param('informationId') informationId: string,
    @Body() body: UpdateInformationBody,
  ) {
    const { name, description } = body;

    const { information } = await this.updateInformation.execute({
      informationId,
      name,
      description,
    });

    return {
      information: InformationViewModel.toHTTP(information),
    };
  }
}