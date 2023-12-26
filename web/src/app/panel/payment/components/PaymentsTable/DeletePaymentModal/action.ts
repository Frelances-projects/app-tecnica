'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { errorMessages } from '@/utils/errors/errorMessages'

export async function deletePayment(paymentId: string) {
  try {
    await api.delete(`/payment/${paymentId}`)

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
