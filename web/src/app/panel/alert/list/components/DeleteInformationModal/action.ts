'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { errorMessages } from '@/utils/errors/errorMessages'

export async function deleteInfo(informationId: string) {
  try {
    await api.delete(`/information/${informationId}`)

    revalidatePath('/panel/alert/list')

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (
          error.response?.data.message === errorMessages.informationNotFound
        ) {
          return {
            message:
              'Alerta não encontrado! Parece que esse alerta já foi deletado!',
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
