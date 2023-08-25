import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'
import { PaymentRepository } from 'src/application/repositories/payment-repository'
import { PrismaPaymentMapper } from '../mappers/prisma-payment-mapper'
import { Payment } from 'src/application/entities/payment'

@Injectable()
export class PrismaPaymentRepository implements PaymentRepository {
  constructor(private prisma: PrismaService) {}

  async create(payment: Payment): Promise<void> {
    const raw = PrismaPaymentMapper.toPrisma(payment)

    await this.prisma.payment.create({ data: raw })
  }

  async findById(paymentId: string): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
    })

    if (!payment) {
      return null
    }

    return PrismaPaymentMapper.toDomain(payment)
  }

  async save(payment: Payment): Promise<void> {
    const raw = PrismaPaymentMapper.toPrisma(payment)

    await this.prisma.payment.update({ where: { id: raw.id }, data: raw })
  }
}
