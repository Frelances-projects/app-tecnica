import { Dispatch, SetStateAction, useState } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Barcode, Check } from '@phosphor-icons/react'

import { Input } from '@/components/Input'
import { DefaultButton } from '@/components/buttons/DefaultButton'
import { useToast } from '@/components/ui/use-toast'

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
  const [classCode, setClassCode] = useState('')

  const queryClient = useQueryClient()
  const { toast } = useToast()

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

  const { mutateAsync: markClassAsCompleted, isLoading: isMarcClassAsCompletedLoading } = useMutation(
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
      setClassCode('')
      return
    }

    await markClassAsCompleted({ classId: lesson.id, studentId: student?.id!! })
  }

  async function onClickButton() {
    const lesson = theoreticalClassesData?.find(lesson => lesson.code === Number(classCode))

    if (!lesson) {
      return toast({
        title: 'Aula de código não encontrada!',
        description: 'Nenhuma aula de código foi encontrada com esse código!',
        variant: 'destructive'
      })
    }

    await handleMarkLessonAsCompleted(lesson)
    setClassCode('')
  }

  const theoreticalClassesCompleted = theoreticalClassesData?.filter(
    (lesson) => lesson?.scheduledClass?.status === 'COMPLETED',
  )

  return (
    <div className='w-full flex flex-col gap-4 mt-4'>
      <Head>
        <title>Alunos - Grupo Técnica</title>
      </Head>

      <div className='flex flex-col gap-2'>
        <h1 className="text-2xl font-semibold">
          Bem-vindo(a), {student?.name}
        </h1>

        <h2 className="font-regular">
          Aluno(a) N° {student?.number}
        </h2>
      </div>

      <div className="w-full">
        <p className="mb-2 text-lg font-semibold">
          Listagem de Aulas de código
        </p>

        <div className="mb-4 flex gap-2 items-center">
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

        <Input
          placeholder="Código da aula"
          type='number'
          Icon={<Barcode size={32} weight="fill" />}
          classNameFieldset='mb-3'
          value={classCode}
          onChange={(event) => setClassCode(event.target.value)}
        />

        <DefaultButton
          title='Marcar aula como concluída'
          disabled={classCode.trim() === '' || isMarcClassAsCompletedLoading}
          onClick={() => onClickButton()}
        />
      </div>

      {theoreticalClassesCompleted?.map(lesson => (
        <div
          key={lesson.id}
          className="mx-auto mb-2 flex w-[94%] flex-row items-center justify-between rounded-md border border-zinc-300 border-opacity-10 px-3 py-2 shadow"
        >
          <div className="flex-row items-center gap-x-1">
            <span className="font-bold">{lesson.name}</span>
          </div>
          
          <div
            className={`text-green-500 opacity-100`}
          >
            <Check />
          </div>
        </div>
      ))}
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
