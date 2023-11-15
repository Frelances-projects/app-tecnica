import { Body, Controller, Get, Param, Put, Post, Delete } from '@nestjs/common'

import { CreateInformation } from '../../../application/use-cases/information/create-information'
import { GetInformationById } from '../../../application/use-cases/information/get-information-by-id'
import { DeleteInformation } from '../../../application/use-cases/information/delete-information'
import { UpdateInformation } from '../../../application/use-cases/information/update-information'
import { GetManyInformation } from '../../../application/use-cases/information/get-many-informations'
import { GetManyInformationBySchool } from '../../../application/use-cases/information/get-many-informations-by-school'

import { InformationViewModel } from '../view-models/information-view-model'

import { CreateInformationBody } from '../dtos/information/create-information-body'
import { UpdateInformationBody } from '../dtos/information/update-information-body'

import { PushNotificationService } from 'src/push-notification/push-notification.service'

@Controller('information')
export class InformationController {
  constructor(
    private createInformation: CreateInformation,
    private getInformationById: GetInformationById,
    private deleteInformation: DeleteInformation,
    private updateInformation: UpdateInformation,
    private getManyInformation: GetManyInformation,
    private getManyInformationBySchool: GetManyInformationBySchool,
    private pushNotificationService: PushNotificationService,
  ) {}

  @Get(':informationId')
  async getById(@Param('informationId') informationId: string) {
    const { information } = await this.getInformationById.execute(informationId)

    return {
      information: InformationViewModel.toHTTP(information),
    }
  }

  @Get()
  async getMany() {
    const { information } = await this.getManyInformation.execute()

    const informationToHTTP = information.map((info) =>
      InformationViewModel.toHTTP(info),
    )

    return {
      information: informationToHTTP,
    }
  }

  @Get('/school/:schoolId')
  async getManyBySchool(@Param('schoolId') schoolId: string) {
    const { information } = await this.getManyInformationBySchool.execute(
      schoolId,
    )

    const informationToHTTP = information.map((info) =>
      InformationViewModel.toHTTP(info),
    )

    return {
      information: informationToHTTP,
    }
  }

  @Post()
  async create(@Body() body: CreateInformationBody) {
    const { information } = await this.createInformation.execute(body)

    await this.pushNotificationService.sendNotificationToSchool({
      schoolId: information.schoolId,
      title: 'Um novo alerta foi gerado na sua escola!',
      body: `Sobre o alerta: ${information.description}`,
    })

    return {
      information: InformationViewModel.toHTTP(information),
    }
  }

  @Put(':informationId')
  async update(
    @Param('informationId') informationId: string,
    @Body() body: UpdateInformationBody,
  ) {
    const { name, description, date } = body

    const { information } = await this.updateInformation.execute({
      informationId,
      name,
      description,
      date,
    })

    return {
      information: InformationViewModel.toHTTP(information),
    }
  }

  @Delete(':informationId')
  async delete(@Param('informationId') informationId: string) {
    await this.deleteInformation.execute(informationId)
  }
}
