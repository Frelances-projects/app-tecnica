import { GetServerSideProps } from 'next';
import Head from 'next/head'
import { parseCookies } from 'nookies';
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from "axios";

import { PracticalClassesList } from "@/components/PracticalClassesList";

import { server } from '@/lib/server'
import type { Student } from '@/contexts/AuthContext';

export interface ScheduledClass {
  id: string
  schedulingDate?: string
  schedulingHour?: string
  status: 'PENDING' | 'UNCHECKED' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  studentId: string
  classId: string
  class: PracticalClassesData
}

export interface PracticalClassesData {
  id: string
  name: string
  code: number
  description: string
  category: "THEORETICAL" | "PRACTICAL"
  createdAt: string
  scheduledClass?: ScheduledClass
}

interface PracticalClassesProps {
  student: Student
}

export default function PracticalClasses({ student }: PracticalClassesProps) {
  const { data: practicalClassesData, isLoading } = useQuery<ScheduledClass[]>(['practical-classes'], async () => {
    try {
      const { data } = await server.get(`/scheduled-class/student/${student?.id}/category`, { params: { category: "PRACTICAL" } })

      return data.scheduledClasses
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("🚀 ~ file: AuthContext.tsx:52 ~ const{data:practicalClassesData}=useQuery ~ error:", error.response?.data.message[0])
        window.alert(error.response?.data.message[0])
      }
    }
  })

  const completedPracticalClasses = practicalClassesData?.filter(lesson => lesson?.status === 'COMPLETED').length ?? 0
  const confirmedPracticalClasses = practicalClassesData?.filter(lesson => lesson?.status === 'CONFIRMED').length ?? 0

  return (
    <div className="flex flex-col gap-4 mt-4 items-start">
      <Head>
        <title>Alunos - Grupo Técnica</title>
      </Head>

      <div className='flex flex-col gap-4'>
        <div className="text-xl font-semibold">Bem-vindo(a), {student?.name}</div>
        <div className="font-regular text-sm">Aluno(a) N° {student?.number}</div>

        <p className='font-semibold text-sm leading-relaxed'>
          As faltas às aulas práticas sem aviso prévio de 24 horas são consideradas lições dadas e obrigam à compra de uma aula de repetição
        </p>
      </div>

      <h1 className="text-black font-semibold text-lg">Listagem de Aulas Práticas</h1>

      <div className="flex gap-2 items-center">
        <h1 className="font-regular">Já completou </h1>
        <p className="font-regular font-bold">
          {completedPracticalClasses + confirmedPracticalClasses}
        </p>
        <p>aulas</p>
      </div>

      <PracticalClassesList practicalClassesData={practicalClassesData} isLoading={isLoading} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { '@studentsPlatform:student': student } = parseCookies({ req: ctx.req })

  if (!student) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      student: JSON.parse(student)
    },
  }
}