import { Dispatch, SetStateAction, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native'
import { Barcode, CaretDown, CaretUp } from 'phosphor-react-native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from '@/lib/axios'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/Input'
import { Checkbox } from '@/components/checkbox'
import { Skeleton } from '@/components/Skeleton'

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

export default function TheoreticalClasses() {
  const { student } = useAuth()
  const queryClient = useQueryClient()

  const [classCode, setclassCode] = useState('')

  const { data: theoreticalClassesData, isLoading } = useQuery<
    TheoreticalClassesData[]
  >(['theoretical-classes'], async () => {
    try {
      const { data } = await api.get(`/class/category/${student?.id}`, {
        params: { category: 'THEORETICAL' },
      })

      return data.classes
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(
          '🚀 ~ file: AuthContext.tsx:52 ~ const{mutateAsync:createSession}=useMutation ~ error:',
          error.response?.data.message[0],
        )
        Alert.alert('Eita', error.response?.data.message[0])
      }
    }
  })

  const { mutateAsync: markClassAsCompleted } = useMutation(
    async ({ classId, studentId }: MarkClassAsCompleted) => {
      try {
        await api.post('/scheduled-class', {
          studentId,
          classId,
          status: 'COMPLETED',
        })
      } catch (error) {
        if (error instanceof AxiosError) {
          Alert.alert('Eita', error.response?.data.message[0])
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

  const [data, setData] = useState(dataTeste)

  const [activeIndex, setActiveIndex] = useState(0)

  // function AccordionSection({
  //   section,
  //   isActiveSection,
  //   setActiveIndex,
  //   sectionIndex,
  // }: AccordionSectionProps) {
  //   const toggleSection = () => {
  //     const nextIndex = isActiveSection ? null : sectionIndex
  //     setActiveIndex(nextIndex)
  //   }

  //   const classesChecked = section?.scheduledClass?.filter(item => {
  //     return item.status === 'COMPLETED'
  //   })

  //   return (
  //     <View className="mt-9 w-full">
  //       <TouchableOpacity
  //         onPress={toggleSection}
  //         className="flex w-full flex-row justify-between border-b border-[#EBEBEB]"
  //       >
  //         <Text className="font-bold">{section?.description}</Text>
  //         <View className="flex flex-row gap-2">
  //           <Text>
  //             {classesChecked?.length} / 28
  //           </Text>
  //           {isActiveSection ? <CaretUp /> : <CaretDown />}
  //         </View>
  //       </TouchableOpacity>
  //       <View
  //         className={`flex flex-col transition-all duration-200 ease-in-out ${
  //           isActiveSection ? 'mt-4' : ''
  //         }`}
  //       >
  //         {isActiveSection &&
  //             (
  //               <Checkbox
  //                 key={section?.id}
  //                 id={section?.id}
  //                 placeholder={section?.name}
  //                 isChecked={section?.scheduledClass ? section?.scheduledClass[0]?.status === 'COMPLETED' ? true : false : false}
  //                 setData={setData}
  //               />
  //             )}
  //       </View>
  //     </View>
  //   )
  // }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, alignItems: 'center', paddingHorizontal: 32 }}
    >
      <Text className="mb-2 text-xl font-semibold">
        Bem-vindo(a), {student?.name}
      </Text>
      <Text className="mb-12 font-regular text-sm">
        Aluno(a) N° {student?.number}
      </Text>
      <View className="-ml-[1px] -mt-10 flex-row items-start">
        <Text className="font-regular text-sm">Já completou </Text>
        <Text className="font-regular text-sm font-bold">
          {
            theoreticalClassesData?.filter(
              (lesson) => lesson?.scheduledClass?.status === 'COMPLETED',
            ).length
          }
        </Text>
        <Text className="font-regular text-sm"> de </Text>
        <Text className="font-regular text-sm font-bold">28 </Text>
        <Text>aulas</Text>
      </View>

      <View className="mt-9">
        <Text className="mb-7 text-lg font-semibold">
          Listagem de Aulas de código
        </Text>
        <Input
          placeholder="Código da aula"
          padding="px-[13px] py-[10px]"
          keyboardType="numeric"
          Icon={<Barcode size={32} weight="fill" />}
          onChangeText={(text) => setclassCode(text)}
        />
      </View>
      <ScrollView className="mt-6 w-full">
        {/* {theoreticalClassesData?.map((item, index) => {
          return (
            <AccordionSection
              key={index}
              section={item}
              isActiveSection={index === activeIndex}
              setActiveIndex={setActiveIndex}
              sectionIndex={index}
            />
          )
        })} */}
        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          theoreticalClassesData
            ?.filter((lesson) => {
              if (classCode.trim() === '') {
                // Se o input estiver vazio, exiba todas as aulas
                return true
              } else {
                // Se houver algo no input, filtre com base no código da aula
                return lesson.code.toString().includes(classCode)
              }
            })
            .map((lesson) => (
              <Checkbox
                key={lesson?.id}
                id={lesson?.id}
                onPress={() => handleMarkLessonAsCompleted(lesson)}
                placeholder={lesson?.name}
                isChecked={
                  lesson?.scheduledClass
                    ? lesson?.scheduledClass?.status === 'COMPLETED'
                    : false
                }
                setData={setData}
              />
            ))
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
