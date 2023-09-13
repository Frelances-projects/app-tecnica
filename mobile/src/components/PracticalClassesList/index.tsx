import { Text, View, ScrollView } from "react-native";

import { PracticalClassItem } from "./PracticalClassItem";
import { Skeleton } from "../Skeleton";

import { PracticalClassesData } from "@/app/(stack)/(drawer)/practical-classes";

interface PracticalClassesListProps {
  practicalClassesData?: PracticalClassesData[]
  isLoading: boolean
}

export function PracticalClassesList({ practicalClassesData, isLoading }: PracticalClassesListProps) {
  return (
    <View className="mt-12">
      <Text className="text-black font-semibold text-lg">Listagem de Aulas Práticas</Text>

      <ScrollView className="mt-10">
        {isLoading ? (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : (
          practicalClassesData && practicalClassesData.length > 0 ? (
            practicalClassesData?.map(lesson => (
              <PracticalClassItem 
                key={lesson.id} 
                title={lesson.name} 
                date={lesson.scheduledClass?.schedulingDate!!} 
                status={lesson.scheduledClass?.status!!}
              />
            ))
          ) : (
            <Text className="text-lg text-black font-bold">Nenhuma aula prática marcada ainda!</Text>
          )
        )}
      </ScrollView>
    </View>
  )
}