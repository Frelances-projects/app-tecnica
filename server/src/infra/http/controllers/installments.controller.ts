import { Body, Controller, Get, Param, Put, Post } from '@nestjs/common'

import { InstallmentsViewModel } from '../view-models/installments-view-model'

import { CreateInstallments } from 'src/application/use-cases/installments/create-installments'
import { GetInstallmentsById } from 'src/application/use-cases/installments/get-installments-by-id'
import { UpdateInstallments } from '../../../application/use-cases/installments/update-installments'

import { CreateInstallmentsBody } from '../dtos/installments/create-installments-body'
import { UpdateInstallmentsBody } from '../dtos/installments/update-installments-body'

@Controller('installments')
export class InstallmentsController {
  constructor(
    private createInstallments: CreateInstallments,
    private updateInstallments: UpdateInstallments,
    private getInstallmentsById: GetInstallmentsById,
  ) {}

  @Get(':installmentsId')
  async getById(@Param('installmentsId') installmentsId: string) {
    const { installments } = await this.getInstallmentsById.execute(
      installmentsId,
    )

    return {
      installments: InstallmentsViewModel.toHTTP(installments),
    }
  }

  @Post()
  async create(@Body() body: CreateInstallmentsBody) {
    const { installments } = await this.createInstallments.execute(body)

    return {
      installments: InstallmentsViewModel.toHTTP(installments),
    }
  }

  @Put(':installmentsId')
  async update(
    @Param('installmentsId') installmentsId: string,
    @Body() body: UpdateInstallmentsBody,
  ) {
    const {
      amountOfInstallments,
      amountOfInstallmentsPaid,
      amountOfRemainingInstallments,
      valueOfAnInstallment,
    } = body

    const { installments } = await this.updateInstallments.execute({
      id: installmentsId,
      amountOfInstallments,
      amountOfInstallmentsPaid,
      amountOfRemainingInstallments,
      valueOfAnInstallment,
    })

    return {
      installments: InstallmentsViewModel.toHTTP(installments),
    }
  }
}
