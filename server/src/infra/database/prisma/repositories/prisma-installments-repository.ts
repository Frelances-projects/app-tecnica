import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prisma.service'

import { Installments } from 'src/application/entities/installments'
import { InstallmentsRepository } from 'src/application/repositories/installments-repository'
import { PrismaInstallmentsMapper } from '../mappers/prisma-installments-mapper'

@Injectable()
export class PrismaInstallmentsRepository implements InstallmentsRepository {
  constructor(private prisma: PrismaService) {}

  async create(installments: Installments): Promise<void> {
    const raw = PrismaInstallmentsMapper.toPrisma(installments)

    await this.prisma.installments.create({data: { amountOfInstallments: raw.amountOfInstallments, amountOfInstallmentsPaid: raw.amountOfInstallmentsPaid, amountOfRemainingInstallments: raw.amountOfRemainingInstallments, id: raw.id, paymentId: raw.paymentId, valueOfAnInstallment: raw.valueOfAnInstallment, createdAt: raw.createdAt}})
  }

  async findById(installmentsId: string): Promise<Installments> {
    const installments = await this.prisma.installments.findUnique({
      where: { id: installmentsId },
    })

    if (!installments) {
      return null
    }

    return PrismaInstallmentsMapper.toDomain(installments)
  }

  async save(installments: Installments): Promise<void> {
    const raw = PrismaInstallmentsMapper.toPrisma(installments)

    await this.prisma.installments.update({ where: { id: raw.id }, data: raw })
  }
}
