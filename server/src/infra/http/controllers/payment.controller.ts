import { Body, Controller, Get, Param, Put, Post, Delete } from '@nestjs/common'

import { PaymentViewModel } from '../view-models/payment-view-model'

import { CreatePayment } from 'src/application/use-cases/payment/create-payment'
import { UpdatePayment } from 'src/application/use-cases/payment/update-payment'
import { DeletePayment } from 'src/application/use-cases/payment/delete-payment'
import { GetManyPayments } from 'src/application/use-cases/payment/get-many-payments'
import { GetManyPaymentsBySchool } from 'src/application/use-cases/payment/get-many-payments-by-school'
import { GetPaymentByStudent } from 'src/application/use-cases/payment/get-payment-by-student'

import { GetPaymentById } from 'src/application/use-cases/payment/get-payment-by-id'
import { CreatePaymentBody } from '../dtos/payment/create-payment-body'
import { UpdatePaymentBody } from '../dtos/payment/update-payment-body'

@Controller('payment')
export class PaymentController {
  constructor(
    private createPayment: CreatePayment,
    private updatePayment: UpdatePayment,
    private deletePayment: DeletePayment,
    private getPaymentById: GetPaymentById,
    private getManyPayments: GetManyPayments,
    private getManyPaymentsBySchool: GetManyPaymentsBySchool,
    private getPaymentByStudent: GetPaymentByStudent,
  ) {}

  @Get()
  async getMany() {
    const { payments } = await this.getManyPayments.execute()

    const paymentsToHTTP = payments.map((payment) =>
      PaymentViewModel.toHTTP(payment),
    )

    return {
      payments: paymentsToHTTP,
    }
  }

  @Get('/school/:schoolId')
  async getManyBySchool(@Param('schoolId') schoolId: string) {
    const { payments } = await this.getManyPaymentsBySchool.execute(schoolId)

    const paymentsToHTTP = payments.map((payment) =>
      PaymentViewModel.toHTTP(payment),
    )

    return {
      payments: paymentsToHTTP,
    }
  }

  @Get(':paymentId')
  async getById(@Param('paymentId') paymentId: string) {
    const { payment } = await this.getPaymentById.execute(paymentId)

    return {
      payment: PaymentViewModel.toHTTP(payment),
    }
  }

  @Get('/student/:studentId')
  async getByStudent(@Param('studentId') studentId: string) {
    const { payment } = await this.getPaymentByStudent.execute(studentId)

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

  @Delete(':paymentId')
  async delete(@Param('paymentId') paymentId: string) {
    await this.deletePayment.execute(paymentId)
  }
}
