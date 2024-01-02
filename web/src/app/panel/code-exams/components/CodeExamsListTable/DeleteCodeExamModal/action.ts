'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { errorMessages } from '@/utils/errors/errorMessages'

export async function deleteCodeExam(testId: string) {
  try {
    await api.delete(`/test/${testId}`)

    revalidatePath('/panel/code-exams')

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (error.response?.data.message === errorMessages.testNotFound) {
          return {
            message: 'Parece que esse exame de código já foi deletado!',
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
