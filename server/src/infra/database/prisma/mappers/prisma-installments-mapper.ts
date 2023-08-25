import { Installments as RawInstallments } from '@prisma/client'

import { Installments } from 'src/application/entities/installments'

export class PrismaInstallmentsMapper {
  static toPrisma(installments: Installments) {
    return {
      id: installments.id,
      valueOfAnInstallment: installments.valueOfAnInstallment,
      amountOfInstallments: installments.amountOfInstallments,
      amountOfInstallmentsPaid: installments.amountOfInstallmentsPaid,
      amountOfRemainingInstallments: installments.amountOfRemainingInstallments,
      paymentId: installments.paymentId,
      createdAt: installments.createdAt,
    }
  }

  static toDomain(raw: RawInstallments): Installments {
    return new Installments(
      {
        valueOfAnInstallment: raw.valueOfAnInstallment,
        amountOfInstallments: raw.amountOfInstallments,
        amountOfInstallmentsPaid: raw.amountOfInstallmentsPaid,
        amountOfRemainingInstallments: raw.amountOfRemainingInstallments,
        paymentId: raw.paymentId,
        createdAt: raw.createdAt,
      },
      raw.id,
    )
  }
}