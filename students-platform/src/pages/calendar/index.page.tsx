import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { server } from '@/lib/server'
import { errorMessages } from '@/utils/errors/errorMessages'
import type { Student } from '@/contexts/AuthContext'

import { useToast } from "@/components/ui/use-toast"

interface Calendar {
  id: string
  schoolId: string
  fileUrl: string
}

type AxiosData = {
  calendar: Calendar
}

interface CalendarProps {
  student: Student
}

export default function Calendar({ student }: CalendarProps) {
  const { toast } = useToast()

  const { data } = useQuery<any>(['calendar'], async () => {
    try {
      const { data } = await server.get<AxiosData>(`/calendar/school/${student?.schoolId}`)

      return data?.calendar ? data.calendar : {}
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("🚀 ~ file: index.page.tsx:36 ~ const{data,isLoading}=useQuery ~ error:", error)
        toast({
          title: "Ops! Erro no servidor",
          description: "Tente novamente mais tarde",
          variant: 'destructive'
        })
      }
    }
  })

  return (
    <div className="flex flex-col gap-4 items-start mt-6">
      <Head>
        <title>Alunos - Grupo Técnica</title>
      </Head>

      <div>
        <h1 className="text-xl font-semibold">Bem-vindo(a), {student?.name}</h1>
        <span className="mb-12 font-regular text-sm">Aluno(a) N° {student?.number}</span>
      </div>

      <div className='flex flex-col items-start'>
        {data?.fileUrl ? (
          <>
            <span className='mb-5'>Realizar download do calendário das aulas deste mês</span>

            <a
              href={data?.fileUrl}
              target="_blank"
              className="flex h-10 items-center justify-center gap-2 rounded bg-primary-500 px-4 text-white disabled:cursor-not-allowed"
            >
              Ver calendário das aulas
            </a>
          </>
        ) : (
          <span>Nenhum calendário de aulas encontrado</span>
        )}
      </div>
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
