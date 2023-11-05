import { Dispatch, SetStateAction, useState } from 'react'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Barcode } from '@phosphor-icons/react'

import { Input } from '@/components/Input'
import { server } from '@/lib/server'

import type { Student } from '@/contexts/AuthContext'

interface sectionAccordionProps {
  id: string
  title: string
  classes: { id: string; content: string; isChecked: boolean }[]
}

interface AccordionSectionProps {
  section: TheoreticalClassesData
  isActiveSection: boolean
  setActiveIndex: Dispatch<SetStateAction<number | null>>
  sectionIndex: number | null
}

interface ScheduledClass {
  id: string
  schedulingDate?: string
  schedulingHour?: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  studentId: string
  classId: string
}

interface TheoreticalClassesData {
  id: string
  name: string
  code: number
  description: string
  category: 'THEORETICAL' | 'PRACTICAL'
  createdAt: string
  scheduledClass?: ScheduledClass
}

interface MarkClassAsCompleted {
  classId: string
  studentId: string
}

interface TheoreticalClassesProps {
  student: Student
}

export default function TheoreticalClasses({ student }: TheoreticalClassesProps) {
  const queryClient = useQueryClient()

  const [classCode, setClassCode] = useState('')

  const { data: theoreticalClassesData, isLoading } = useQuery<
    TheoreticalClassesData[]
  >(['theoretical-classes'], async () => {
    try {
      const { data } = await server.get(`/class/category/${student?.id}`, {
        params: { category: 'THEORETICAL' },
      })

      return data.classes
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(
          '🚀 ~ file: AuthContext.tsx:52 ~ const{mutateAsync:createSession}=useMutation ~ error:',
          error.response?.data.message[0],
        )
        window.alert(`Eita ${error.response?.data.message[0]}`)
      }
    }
  })

  const { mutateAsync: markClassAsCompleted } = useMutation(
    async ({ classId, studentId }: MarkClassAsCompleted) => {
      try {
        await server.post('/scheduled-class', {
          studentId,
          classId,
          status: 'COMPLETED',
        })
      } catch (error) {
        if (error instanceof AxiosError) {
          window.alert(error.response?.data.message[0])
        }
      }
    },
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['theoretical-classes'] })
      },
    },
  )

  async function handleMarkLessonAsCompleted(lesson: TheoreticalClassesData) {
    if (lesson.scheduledClass?.status === 'COMPLETED') {
      return
    }

    await markClassAsCompleted({ classId: lesson.id, studentId: student?.id!! })
  }

  const dataTeste = [
    {
      id: '1',
      title: 'Regras gerais',
      classes: [
        { id: '10', content: 'aula 01', isChecked: true },
        { id: '20', content: 'aula 01', isChecked: false },
        { id: '30', content: 'aula 01', isChecked: true },
        { id: '40', content: 'aula 01', isChecked: false },
      ],
    },
    {
      id: '2',
      title: 'Contraordenações',
      classes: [
        { id: '30', content: 'aula 01', isChecked: false },
        { id: '40', content: 'aula 01', isChecked: false },
      ],
    },
  ]

  return (
    <div className='w-full flex flex-col gap-4 mt-4'>
      <div className='flex flex-col gap-2'>
        <h1 className="text-2xl font-semibold">
          Bem-vindo(a), {student?.name}
        </h1>
        <h2 className="font-regular">
          Aluno(a) N° {student?.number}
        </h2>
      </div>
      <div className="flex gap-2 items-center">
        <p className="font-regular">Já completou </p>
        <p className="font-regular font-bold text-lg">
          {
            theoreticalClassesData?.filter(
              (lesson) => lesson?.scheduledClass?.status === 'COMPLETED',
            ).length
          }
        </p>
        <p className="font-regular"> de </p>
        <p className="font-regular font-bold text-lg">28 </p>
        <p className="font-regular text-sm">aulas</p>
      </div>

      <div className="mt-2 w-full">
        <p className="mb-4 text-lg font-semibold">
          Listagem de Aulas de código
        </p>
        <Input
          placeholder="Código da aula"
          Icon={<Barcode size={32} weight="fill" />}
        />
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
