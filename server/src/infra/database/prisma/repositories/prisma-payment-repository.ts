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

  async findByStudent(studentId: string): Promise<Payment> {
    const payment = await this.prisma.payment.findFirst({
      where: { student: { id: studentId } },
    })

    if (!payment) {
      return null
    }

    return PrismaPaymentMapper.toDomain(payment)
  }

  async findMany(): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
      include: { student: { include: { school: true } } },
    })

    const paymentsToDomain = payments.map((payment) =>
      PrismaPaymentMapper.toDomain(payment),
    )

    return paymentsToDomain
  }

  async findManyBySchool(schoolId: string): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany({
      where: { student: { schoolId } },
      include: { student: { include: { school: true } } },
    })

    const paymentsToDomain = payments.map((payment) =>
      PrismaPaymentMapper.toDomain(payment),
    )

    return paymentsToDomain
  }

  async save(payment: Payment): Promise<void> {
    const raw = PrismaPaymentMapper.toPrisma(payment)

    await this.prisma.payment.update({ where: { id: raw.id }, data: raw })
  }

  async delete(paymentId: string): Promise<void> {
    await this.prisma.payment.delete({ where: { id: paymentId } })
  }
}
