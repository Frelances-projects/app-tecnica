import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

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
      await SecureStore.setItemAsync('student', JSON.stringify(data.student))
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("🚀 ~ file: AuthContext.tsx:52 ~ const{mutateAsync:createSession}=useMutation ~ error:", error.response?.data.message[0])
        Alert.alert('Eita', error.response?.data.message[0])
      }
    }
  })

  const login = useCallback(async ({ number, password }: LoginData) => {
    await createSession({ number, password })
  }, [])

  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync('student')
    setStudent(null)
    
    router.back()
  }, [])

  async function loadStorageData() {
    const studentStorage = await SecureStore.getItemAsync('student')

    if (studentStorage) {
      setStudent(JSON.parse(studentStorage))
    }
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
