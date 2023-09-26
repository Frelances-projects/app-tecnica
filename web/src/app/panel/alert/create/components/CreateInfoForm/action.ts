'use server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { AxiosError } from "axios"

import { api } from "@/lib/api"
import { errorMessages } from "@/utils/errors/errorMessages"

export async function registerInfo(data: FormData) {
  try {
    const user = cookies().get('user')?.value
    const formattedUser = JSON.parse(user!!)

    const title = data.get('title')?.toString()
    const date = data.get('date')?.toString()
    const description = data.get('description')?.toString()

    await api.post('/information',
      { 
        name: title,
        date: String(new Date(date!!).toISOString()),
        description,
        schoolId: formattedUser.schoolId
      }
    )

    revalidatePath('/panel/alert/edit')

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (error.response?.data.message[0] === errorMessages.nameEmpty) {
          return  { message: 'O nome do alerta é um campo obrigatório!' }
        } else if (error.response?.data.message === errorMessages.dateEmpty) {
          return { message: 'A data do alerta é um campo obrigatório!' }
        } else if (error.response?.data.message[0] === errorMessages.descriptionShorter) {
          return { message: 'A descrição do alerta deve conter pelo menos 5 caracteres' }
        } else if (error.response?.data.message[0] === errorMessages.descriptionLonger) {
          return { message: 'A descrição do alerta deve conter no máximo 460 caracteres' }
        }
      }
    }
    return { message: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde' }
  }
}