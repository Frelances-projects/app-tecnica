'use server'
import { cookies } from 'next/headers'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { errorMessages } from '@/utils/errors/errorMessages'

type User = {
  id: string
  name: string
  email: string
  function: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
  schoolId: string
  createdAt: Date
}

type AxiosData = {
  user: User
}

export async function registerUser(data: FormData) {
  try {
    const name = data.get('name')?.toString()
    const email = data.get('email')?.toString()
    const password = data.get('password')?.toString()
    const schoolId = data.get('school')?.toString()
    const userFunction = data.get('user_function')?.toString()

    const { data: createUserResponseData } = await api.post<AxiosData>(
      '/user',
      { name, email, password, schoolId, function: userFunction },
    )

    cookies().set('user', JSON.stringify(createUserResponseData.user))

    return {
      message: 'Success!',
      userFunction: createUserResponseData.user.function,
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (error.response?.data.message[0] === errorMessages.passwordEmpty) {
          return { message: 'A senha é um campo obrigatório' }
        } else if (
          error.response?.data.message === errorMessages.emailHasAlreadyBeenUsed
        ) {
          return {
            message:
              'Esse E-mail já está sendo utilizando, por favor coloque outro E-mail',
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
