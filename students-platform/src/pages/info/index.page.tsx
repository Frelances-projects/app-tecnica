import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/axios'
import { errorMessages } from '@/utils/errors/errorMessages'

import { Spinner } from '@phosphor-icons/react'

import { useToast } from "@/components/ui/use-toast"

interface Test {
  id: string;
  category: "THEORETICAL" | "PRACTICAL";
  status: "APPROVED" | "DISAPPROVED" | "MARKED";
  studentId: string;
  testDate: string;
  testHour: string;
  createdAt: string;
}

interface School {
  id: string
  name: string
  createdAt: string;
}

interface Installment {
  id: string
  createdAt: string;
  valueOfAnInstallment: number
  amountOfInstallments: number
  amountOfInstallmentsPaid: number
  amountOfRemainingInstallments: number
  paymentId: string
}

interface Payment {
  id: string
  method: "INSTALLMENTS" | "INCASH"
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
  const { toast } = useToast()

  const { data: studentInfo, isLoading } = useQuery<StudentInfo>(['information'], async () => {
    try {
      const [{ data: testData }, { data: schoolData }, { data: paymentData }] = await Promise.all([
        api.get(`/test/student/${student?.id}`),
        api.get(`/school/${student?.schoolId}`),
        api.get(`/payment/${student?.paymentId}`)
      ])

      const paymentInfo = {
        ...paymentData.payment,
        total: Intl.NumberFormat('en-DE', {
          style: 'currency',
          currency: 'EUR',
        }).format(paymentData.payment.total / 100)
      }

      const studentInfo = {
        ...testData,
        ...schoolData,
        payment: paymentInfo
      }

      return studentInfo
    } catch (error) {
      if (error instanceof AxiosError) {
        window.alert(`Eita ${error.response?.data.message[0]}`)
        if (error.response?.data.message === errorMessages.schoolNotFound) {
          toast({
            title: "Escola não encontrada",
            description: "Por favor entre em contado com o administrador",
            variant: 'destructive'
          })
        } else if (error.response?.data.message === errorMessages.paymentNotFound) {
          toast({
            title: "Informações do pagamento não encontradas",
            description: "Por favor entre em contado com o administrador",
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

  return (
    <div className="flex flex-col gap-4 items-start mt-6">
      <div>
        <h1 className="text-xl font-semibold">Bem-vindo(a), {student?.name}</h1>
        <span className="mb-12 font-regular text-sm">Aluno(a) N° {student?.number}</span>
      </div>

      <div className="w-full">
        <h2 className="mb-5 text-xl font-semibold">Informações</h2>

        <div>
          <span className="text-base font-bold">Exame de Código</span>

          <div className="mb-2 mt-1 h-[1px] w-full bg-[#EBEBEB]" />

          {isLoading ? (
            <Spinner size={20} className='animate-spin'/>
          ) : (
            !studentInfo?.tests &&
            <p className="font-regular text-sm">
              Informação não encontrada...
            </p>
          )}
        </div>

        <div className="mt-6">
          <p className="text-base font-bold">Exame de Condução</p>

          <div className="mb-2 mt-1 h-[1px] w-full bg-[#EBEBEB]" />

          {isLoading ? (
            <Spinner size={20} className='animate-spin'/>
          ) : (
            !studentInfo?.tests &&
            <p className="font-regular text-sm">
              Informação não encontrada...
            </p>
          )}
        </div>

        <div className="mt-6">
          <p className="text-base font-bold">Outras informações</p>

          <div className="mb-2 mt-1 h-[1px] w-full bg-[#EBEBEB]" />

          {isLoading ? (
            <Spinner size={20} className='animate-spin'/>
          ) : (
            <p className="font-regular text-sm">
              A escola {studentInfo?.school.name} encontra-se encerrada até dia 10.
            </p>
          )}
        </div>

        <div className="mt-6">
          <p className="text-base font-bold">Pagamentos Pendentes</p>

          <div className="mb-2 mt-1 h-[1px] w-full bg-[#EBEBEB]" />

          {isLoading ? (
            <>
              <Spinner size={20} className='animate-spin'/>
            </>
          ) : (
            <>
              <p className="font-regular text-sm mb-5">
                {studentInfo?.payment.method === 'INCASH' && `Pagamento de ${studentInfo.payment.total} realizado com sucesso`}
                {
                  studentInfo?.payment.method === 'INSTALLMENTS' 
                  && 
                  `Prestação ${studentInfo.payment.installments!![0].amountOfInstallmentsPaid} de ${studentInfo.payment.installments!![0].amountOfInstallments} a pagamento: ${studentInfo.payment.installments!![0].valueOfAnInstallment}`
                }
              </p>

              {
              studentInfo?.payment.method === 'INSTALLMENTS' && 
                <p className="font-regular text-sm">
                  Dirige-te à escola para proceder ao pagamento.
                </p>
              }
            </>
          )}
        </div>
      </div>
    </div>
  )
}
