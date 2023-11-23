import { ReactNode, createContext, useCallback, useState } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useToast } from '@/components/ui/use-toast'

import { server } from '@/lib/server'
import { errorMessages } from '@/utils/errors/errorMessages'

export type Student = {
  id: string
  name: string
  email: string
  number: number
  phone?: string
  token?: string
  paymentId?: string
  driverLicenseCategory: 'A' | 'B' | 'C' | 'ALL'
  driverLicenseCategoryId?: string
  schoolId: string
  enrolledAt: string
  firebaseTokens?: string[]
}

type LoginData = {
  number: number
  password: string
}

export type AuthContextDataProps = {
  student: Student | null
  login: ({ number, password }: LoginData) => Promise<void>
  logout: () => void
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthProvider({ children }: AuthContextProviderProps) {
  const router = useRouter()
  const { toast } = useToast()

  const { '@studentsPlatform:student': studentInCookies } = parseCookies()

  const [student, setStudent] = useState<Student | null>(
    studentInCookies 
    ? JSON.parse(studentInCookies) : null
  )

  const { mutateAsync: createSession } = useMutation(async ({ number, password }: LoginData) => {
    try {
      const { data } = await server.post('/student/session', { number, password })

      setStudent(data.student)
      setCookie(null, '@studentsPlatform:student', JSON.stringify(data.student), {
        maxAge: 60 * 60 * 24 * 360, // 360 days
        path: '/',
      })
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
  }, [createSession])

  const logout = useCallback(() => {
    setStudent(null)
    destroyCookie(null, '@studentsPlatform:student')
    
    router.push('/')
  }, [])

  return <AuthContext.Provider value={{
    login,
    logout,
    student
  }}>{children}</AuthContext.Provider>
}
