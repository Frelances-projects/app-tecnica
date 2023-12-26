'use server'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'

import { errorMessages } from '@/utils/errors/errorMessages'

export async function resetPassword(data: FormData, token: string) {
  try {
    const newPassword = data.get('password')?.toString()

    await api.patch(`/user/password/reset-password/${token}`, { newPassword })

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (
          error.response?.data.message[0] === errorMessages.newPasswordEmpty
        ) {
          return { message: 'A senha é um campo obrigatório' }
        } else if (
          error.response?.data.message[0] === errorMessages.strongPassword
        ) {
          return {
            message:
              'A senha não é forte o suficiente! Por favor insira uma senha mais forte(Coloque pelo menos uma letra maiúscula 1, 1 caracter especial e 1 número)',
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
