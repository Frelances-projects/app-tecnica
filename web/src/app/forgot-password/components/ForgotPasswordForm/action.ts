'use server'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'

import { errorMessages } from '@/utils/errors/errorMessages'

export async function forgotPassword(data: FormData) {
  try {
    const email = data.get('email')?.toString()

    await api.post('/user/password/forgot-password', {
      email,
      link: 'https://backoffice-app-tecnica.vercel.app/reset-password',
    })

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (error.response?.data.message[0] === errorMessages.emailEmpty) {
          return { message: 'O E-mail é um campo obrigatório' }
        } else if (error.response?.data.message === errorMessages.linkEmpty) {
          return {
            message: 'Erro ao enviar o link, tente novamente mais tarde!',
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
