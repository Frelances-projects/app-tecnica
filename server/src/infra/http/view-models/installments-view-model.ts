import { Installments } from "src/application/entities/installments";

export class InstallmentsViewModel {
  static toHTTP(installments: Installments) {
    return {
      id: installments.id,
      createdAt: installments.createdAt,
      valueOfAnInstallment: installments.valueOfAnInstallment,
      amountOfInstallments: installments.amountOfInstallments,
      amountOfInstallmentsPaid: installments.amountOfInstallmentsPaid,
      amountOfRemainingInstallments: installments.amountOfRemainingInstallments,
      paymentId: installments.paymentId,
    }
  }
}
