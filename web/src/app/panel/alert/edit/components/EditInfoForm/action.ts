'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from "axios"

import { api } from "@/lib/api"
import { errorMessages } from "@/utils/errors/errorMessages"

export async function updateInfo(data: FormData) {
  try {
    const title = data.get('title')?.toString()
    const date = data.get('date')?.toString()
    const description = data.get('description')?.toString()
    const information = data.get('information')?.toString()

    await api.put(`/information/${information}`,
      { 
        name: title,
        date: String(new Date(date!!).toISOString()),
        description,
      }
    )

    revalidatePath('/panel/alert/edit')

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.message === errorMessages.informationNotFound) {
        return { message: 'Alerta não encontrado! Parece que esse alerta já foi deletado!' }
      } else if (error.response?.data.message[0] === errorMessages.descriptionShorter) {
        return { message: 'A descrição do alerta deve conter pelo menos 5 caracteres' }
      } else if (error.response?.data.message[0] === errorMessages.descriptionLonger) {
        return { message: 'A descrição do alerta deve conter no máximo 460 caracteres' }
      }
    }
    return { message: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde' }
  }
}

export async function deleteInfo(selectInformation: string) {
  try {
    await api.delete(`/information/${selectInformation}`)

    revalidatePath('/panel/alert/edit')

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.message === errorMessages.informationNotFound) {
        return { message: 'Alerta não encontrado! Parece que esse alerta já foi deletado!' }
      }
    }
    return { message: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde' }
  }
}