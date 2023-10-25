import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import nookies from 'nookies'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'
import { errorMessages } from '@/utils/errors/errorMessages'
import { useRouter } from 'next/router'
import { useToast } from '@/components/ui/use-toast'

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
  const { toast } = useToast()

  const { mutateAsync: createSession } = useMutation(async ({ number, password }: LoginData) => {
    try {
      const { data } = await api.post('/student/session', { number, password })

      setStudent(data.student)
      // await SecureStore.setItemAsync('student', JSON.stringify(data.student))
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message[0] === errorMessages.passwordEmpty) {
          toast({
            title: "A senha é obrigatória",
            description: "Por favor digite a senha",
            variant: 'destructive'
          })
        } else if (error.response?.data.message === errorMessages.studentNotFound) {
          toast({
            title: "Estudante não cadastrado",
            description: "Não existe nenhum estudante cadastrado com esse número",
            variant: 'destructive'
          })
        } else if (error.response?.data.message === errorMessages.incorrectPassword) {
          toast({
            title: "Senha incorreta",
            description: "Por favor digite a senha novamente",
            variant: 'destructive'
          })
        } else {
          toast({
            title: "Ops! Erro no servidor",
            description: "Tente novamente mais tarde",
            variant: 'destructive'
          })
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
