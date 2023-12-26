'use server'
import { cookies } from 'next/headers'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'

import { errorMessages } from '@/utils/errors/errorMessages'
import { User } from '@/utils/interfaces/user'

type AxiosData = {
  user: User
}

export async function loginUser(data: FormData) {
  try {
    const email = data.get('email')?.toString()
    const password = data.get('password')?.toString()

    const { data: loginUserResponseData } = await api.post<AxiosData>(
      '/user/session',
      { email, password },
    )

    cookies().set('user', JSON.stringify(loginUserResponseData.user))

    return {
      message: 'Success!',
      userFunction: loginUserResponseData.user.function,
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (error.response?.data.message[0] === errorMessages.passwordEmpty) {
          return { message: 'A senha é um campo obrigatório' }
        } else if (
          error.response?.data.message ===
          errorMessages.emailOrPasswordIncorrect
        ) {
          return {
            message: 'E-mail ou senha incorretos, por favor tente novamente!',
          }
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
      userFunction: undefined,
    }
  }
}
