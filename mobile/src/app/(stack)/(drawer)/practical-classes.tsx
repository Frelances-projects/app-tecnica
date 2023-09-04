import { Text, View, Alert } from "react-native";
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
        Alert.alert('Eita', error.response?.data.message[0])
      }
    }
  })

  return (
    <View className="flex-1 items-start px-9">
      <Text className="mb-2 text-xl font-semibold">Bem-vindo(a), {student?.name}</Text>
      <Text className="mb-12 font-regular text-sm">Aluno(a) N° {student?.number}</Text>
      <View className="-ml-[1px] -mt-10 flex-row items-start">
        <Text className="font-regular text-sm">Já completou </Text>
        <Text className="font-regular text-sm font-bold">
          {practicalClassesData?.filter(lesson => lesson?.scheduledClass?.status === 'COMPLETED').length ?? 0}
        </Text>
        <Text> aulas</Text>
      </View>

      <PracticalClassesList practicalClassesData={practicalClassesData} isLoading={isLoading} />
    </View>
  )
}