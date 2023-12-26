'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { errorMessages } from '@/utils/errors/errorMessages'

export async function updateInfo(data: FormData, informationId: string) {
  try {
    const title = data.get('title')?.toString()
    const date = data.get('alert_date')?.toString()
    const description = data.get('description')?.toString()

    await api.put(`/information/${informationId}`, {
      name: title,
      date: String(new Date(date!).toISOString()),
      description,
    })

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
        } else if (
          error.response?.data.message[0] === errorMessages.descriptionShorter
        ) {
          return {
            message:
              'A descrição do alerta deve conter pelo menos 5 caracteres',
          }
        } else if (
          error.response?.data.message[0] === errorMessages.descriptionLonger
        ) {
          return {
            message:
              'A descrição do alerta deve conter no máximo 460 caracteres',
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
