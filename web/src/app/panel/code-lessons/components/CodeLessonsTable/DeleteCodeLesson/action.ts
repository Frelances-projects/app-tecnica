'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { errorMessages } from '@/utils/errors/errorMessages'

export async function deleteCodeLesson(lessonId: string) {
  try {
    await api.delete(`/class/${lessonId}`)

    revalidatePath('/panel/code-lessons')

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (error.response?.data.message === errorMessages.classNotFound) {
          return {
            message: 'Parece que essa aula de código já foi deletada!',
          }
        }
      } else {
        return {
          message:
            'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
        }
      }
    }
    return {
      message:
        'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
    }
  }
}
