import { Payment as RawPayment } from '@prisma/client'

import { Payment } from 'src/application/entities/payment'

export class PrismaPaymentMapper {
  static toPrisma(payment: Payment) {
    return {
      id: payment.id,
      method: payment.method,
      total: payment.total,
      amountOfInstallments: payment.amountOfInstallments,
      amountOfInstallmentsPaid: payment.amountOfInstallmentsPaid,
      amountOfRemainingInstallments: payment.amountOfRemainingInstallments,
      createdAt: payment.createdAt,
    }
  }

  static toDomain(raw: RawPayment): Payment {
    return new Payment(
      {
        method: raw.method,
        total: raw.total,
        amountOfInstallments: raw.amountOfInstallments,
        amountOfInstallmentsPaid: raw.amountOfInstallmentsPaid,
        amountOfRemainingInstallments: raw.amountOfRemainingInstallments,
        createdAt: raw.createdAt,
        ...raw,
      },
      raw.id,
    )
  }
}
