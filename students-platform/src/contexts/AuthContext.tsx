import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import nookies from 'nookies'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ToastContainer, toast } from 'react-toastify';

import { api } from '@/lib/axios'
import { errorMessages } from '@/utils/errors/errorMessages'
import { useRouter } from 'next/router'

type Student = {
  id: string
  name: string
  email: string
  number: number
  token?: string
  paymentId?: string
  driverLicenseCategory: 'A' | 'B' | 'C' | 'ALL'
  schoolId: string
  enrolledAt: string
}

type LoginData = {
  number: number
  password: string
}

export type AuthContextDataProps = {
  student: Student | null
  login: ({ number, password }: LoginData) => Promise<void>
  logout: () => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [student, setStudent] = useState<Student | null>(null)
  const router = useRouter()

  const { mutateAsync: createSession } = useMutation(async ({ number, password }: LoginData) => {
    try {
      const { data } = await api.post('/student/session', { number, password })

      setStudent(data.student)
      // await SecureStore.setItemAsync('student', JSON.stringify(data.student))
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message[0] === errorMessages.passwordEmpty) {
          // toast({
          //   text1: 'A senha é obrigatória',
          //   text2: 'Por favor digite a senha',
          //   type: 'error',
          //   visibilityTime: 8000
          // });
        } else if (error.response?.data.message === errorMessages.studentNotFound) {
          // toast({
          //   text1: 'Estudante não cadastrado',
          //   text2: 'Não existe nenhum estudante cadastrado com esse número',
          //   type: 'error',
          //   visibilityTime: 8000
          // });
        } else if (error.response?.data.message === errorMessages.incorrectPassword) {
          // toast({
          //   text1: 'Senha incorreta',
          //   text2: 'Por favor digite a senha novamente',
          //   type: 'error',
          //   visibilityTime: 8000
          // });
        } else {
          // toast({
          //   text1: 'Ops! Erro no servidor',
          //   text2: 'Tente novamente mais tarde',
          //   type: 'error',
          //   visibilityTime: 8000
          // });
        }
      }
    }
  })

  const login = useCallback(async ({ number, password }: LoginData) => {
    await createSession({ number, password })
  }, [])

  const logout = useCallback(async () => {
    // await SecureStore.deleteItemAsync('student')
    setStudent(null)
    
    router.back()
  }, [])

  async function loadStorageData() {
    // const studentStorage = await SecureStore.getItemAsync('student')

    // if (studentStorage) {
    //   setStudent(JSON.parse(studentStorage))
    // }
  }

  useEffect(() => {
    loadStorageData()
  }, [])

  return <AuthContext.Provider value={{
    login,
    logout,
    student
  }}>{children}</AuthContext.Provider>
}
