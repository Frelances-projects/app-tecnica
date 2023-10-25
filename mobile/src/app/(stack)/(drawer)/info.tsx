import { View, Text, Alert, ScrollView } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Toast from 'react-native-toast-message'

import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/axios'
import { errorMessages } from '@/utils/errors/errorMessages'
import { Skeleton } from '@/components/Skeleton'

interface Test {
  id: string
  category: 'THEORETICAL' | 'PRACTICAL'
  status: 'APPROVED' | 'DISAPPROVED' | 'MARKED'
  studentId: string
  testDate: string
  testHour: string
  createdAt: string
}

interface School {
  id: string
  name: string
  createdAt: string
}

interface Installment {
  id: string
  createdAt: string
  valueOfAnInstallment: number
  amountOfInstallments: number
  amountOfInstallmentsPaid: number
  amountOfRemainingInstallments: number
  paymentId: string
}

interface Payment {
  id: string
  method: 'INSTALLMENTS' | 'INCASH'
  total: number
  installments?: Installment[]
}

interface StudentInfo {
  tests: Test[]
  school: School
  payment: Payment
}

export default function Info() {
  const { student } = useAuth()

  const { data: studentInfo, isLoading } = useQuery<StudentInfo>(
    ['information'],
    async () => {
      try {
        const [
          { data: testData },
          { data: schoolData },
          { data: paymentData },
        ] = await Promise.all([
          api.get(`/test/student/${student?.id}`),
          api.get(`/school/${student?.schoolId}`),
          api.get(`/payment/${student?.paymentId}`),
        ])

        const paymentInfo = {
          ...paymentData.payment,
          total: Intl.NumberFormat('en-DE', {
            style: 'currency',
            currency: 'EUR',
          }).format(paymentData.payment.total / 100),
        }

        const studentInfo = {
          ...testData,
          ...schoolData,
          payment: paymentInfo,
        }

        return studentInfo
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(
            '🚀 ~ file: AuthContext.tsx:52 ~ const{mutateAsync:createSession}=useMutation ~ error:',
            error.response?.data.message[0],
          )
          Alert.alert('Eita', error.response?.data.message[0])
          if (error.response?.data.message === errorMessages.schoolNotFound) {
            Toast.show({
              text1: 'Escola não encontrada',
              text2: 'Por favor entre em contado com o administrador',
              type: 'error',
              visibilityTime: 8000,
            })
          } else if (
            error.response?.data.message === errorMessages.paymentNotFound
          ) {
            Toast.show({
              text1: 'Informações do pagamento não encontradas',
              text2: 'Por favor entre em contado com o administrador',
              type: 'error',
              visibilityTime: 8000,
            })
          } else {
            Toast.show({
              text1: 'Ops! Erro no servidor',
              text2: 'Tente novamente mais tarde',
              type: 'error',
              visibilityTime: 8000,
            })
          }
        }
      }
    },
  )

  return (
    <View className="flex-1 items-start px-9">
      <Text className="mb-2 text-xl font-semibold">
        Bem-vindo(a), {student?.name}
      </Text>
      <Text className="mb-12 font-regular text-sm">
        Aluno(a) N° {student?.number}
      </Text>

      <ScrollView className="mt-5 w-full">
        <Text className="mb-5 text-lg font-semibold">Informações</Text>

        <View>
          <Text className="text-sm font-bold">Exame de Código</Text>

          <View className="mb-2 mt-1 h-[1px] w-full bg-[#EBEBEB]" />

          {isLoading ? (
            <Skeleton />
          ) : (
            !studentInfo?.tests && (
              <Text className="font-regular text-sm">
                Informação não encontrada...
              </Text>
            )
          )}
        </View>

        <View className="mt-6">
          <Text className="text-sm font-bold">Exame de Condução</Text>

          <View className="mb-2 mt-1 h-[1px] w-full bg-[#EBEBEB]" />

          {isLoading ? (
            <Skeleton />
          ) : (
            !studentInfo?.tests && (
              <Text className="font-regular text-sm">
                Informação não encontrada...
              </Text>
            )
          )}
        </View>

        <View className="mt-6">
          <Text className="text-sm font-bold">Outras informações</Text>

          <View className="mb-2 mt-1 h-[1px] w-full bg-[#EBEBEB]" />

          {isLoading ? (
            <Skeleton />
          ) : (
            <Text className="font-regular text-sm">
              A escola {studentInfo?.school.name} encontra-se encerrada até dia
              10.
            </Text>
          )}
        </View>

        <View className="mt-6">
          <Text className="text-sm font-bold">Pagamentos Pendentes</Text>

          <View className="mb-2 mt-1 h-[1px] w-full bg-[#EBEBEB]" />

          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <>
              <Text className="mb-5 font-regular text-sm">
                {studentInfo?.payment.method === 'INCASH' &&
                  `Pagamento de ${studentInfo.payment.total} realizado com sucesso`}
                {studentInfo?.payment.method === 'INSTALLMENTS' &&
                  `Prestação ${
                    studentInfo.payment.installments!![0]
                      .amountOfInstallmentsPaid
                  } de ${
                    studentInfo.payment.installments!![0].amountOfInstallments
                  } a pagamento: ${
                    studentInfo.payment.installments!![0].valueOfAnInstallment
                  }`}
              </Text>

              {studentInfo?.payment.method === 'INSTALLMENTS' && (
                <Text className="font-regular text-sm">
                  Dirige-te à escola para proceder ao pagamento.
                </Text>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
