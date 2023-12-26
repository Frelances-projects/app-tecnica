'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { errorMessages } from '@/utils/errors/errorMessages'

import type { EditPaymentInputs } from '.'
import type { Payment } from '@/utils/interfaces/payment'

export async function editPayment(
  data: EditPaymentInputs,
  payment: Payment,
  totalValue: string,
) {
  try {
    await api.put(`/payment/${payment.id}`, {
      method: data.paymentMethod,
      total: Number(totalValue.replaceAll('.', '').replaceAll(',', '.')) * 100,
      amountOfInstallments: data.amountOfInstallments
        ? Number(data.amountOfInstallments)
        : payment.amountOfInstallments,
      amountOfInstallmentsPaid: data.amountOfInstallmentsPaid
        ? Number(data.amountOfInstallmentsPaid)
        : payment.amountOfInstallmentsPaid,
      amountOfRemainingInstallments:
        data.amountOfInstallments && data.amountOfInstallmentsPaid
          ? data.amountOfInstallments - data.amountOfInstallmentsPaid
          : payment.amountOfRemainingInstallments,
    })

    revalidatePath('/panel/payment')

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (error.response?.data.message === errorMessages.paymentNotFound) {
          return {
            message:
              'Pagamento não encontrada! Parece que esse pagamento já foi deletado!',
          }
        }
      }
    }
    return {
      message:
        'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
    }
  }
}
