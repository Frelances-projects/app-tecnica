import { useQuery } from '@tanstack/react-query'
import { AxiosError } from "axios";

import { PracticalClassesList } from "@/components/PracticalClassesList";

import { api } from '@/lib/axios'
import { useAuth } from "@/hooks/useAuth";

interface ScheduledClass {
  id: string
  schedulingDate?: string
  schedulingHour?: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  studentId: string
  classId: string
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

export default function PracticalClasses() {
  const { student } = useAuth()

  const { data: practicalClassesData, isLoading } = useQuery<PracticalClassesData[]>(['practical-classes'], async () => {
    try {
      const { data } = await api.get(`/class/category/${student?.id}`, { params: { category: "PRACTICAL" } })

      return data.classes
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log("🚀 ~ file: AuthContext.tsx:52 ~ const{mutateAsync:createSession}=useMutation ~ error:", error.response?.data.message[0])
        window.alert(error.response?.data.message[0])
      }
    }
  })

  return (
    <div className="flex flex-col gap-4 mt-4 items-start">
      <div className='flex flex-col gap-4'>
        <div className="text-xl font-semibold">Bem-vindo(a), {student?.name}</div>
        <div className="font-regular text-sm">Aluno(a) N° {student?.number}</div>
      </div>
      <div className="flex gap-2 items-center">
        <h1 className="font-regular">Já completou </h1>
        <p className="font-regular font-bold">
          {practicalClassesData?.filter(lesson => lesson?.scheduledClass?.status === 'COMPLETED').length ?? 0}
        </p>
        <p>aulas</p>
      </div>

      <PracticalClassesList practicalClassesData={practicalClassesData} isLoading={isLoading} />
    </div>
  )
}