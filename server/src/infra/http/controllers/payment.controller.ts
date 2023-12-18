import { Body, Controller, Get, Param, Put, Post } from '@nestjs/common'

import { PaymentViewModel } from '../view-models/payment-view-model'

import { CreatePayment } from 'src/application/use-cases/payment/create-payment'
import { UpdatePayment } from 'src/application/use-cases/payment/update-payment'

import { GetPaymentById } from 'src/application/use-cases/payment/get-payment-by-id'
import { CreatePaymentBody } from '../dtos/payment/create-payment-body'
import { UpdatePaymentBody } from '../dtos/payment/update-payment-body'

@Controller('payment')
export class PaymentController {
  constructor(
    private createPayment: CreatePayment,
    private updatePayment: UpdatePayment,
    private getPaymentById: GetPaymentById,
  ) {}

  @Get(':paymentId')
  async getById(@Param('paymentId') paymentId: string) {
    const { payment } = await this.getPaymentById.execute(paymentId)

    return {
      payment: PaymentViewModel.toHTTP(payment),
    }
  }

  @Post()
  async create(@Body() body: CreatePaymentBody) {
    const { payment } = await this.createPayment.execute(body)

    return {
      payment: PaymentViewModel.toHTTP(payment),
    }
  }

  @Put(':paymentId')
  async update(
    @Param('paymentId') paymentId: string,
    @Body() body: UpdatePaymentBody,
  ) {
    const { payment } = await this.updatePayment.execute({
      id: paymentId,
      ...body,
    })

    return {
      payment: PaymentViewModel.toHTTP(payment),
    }
  }
}
