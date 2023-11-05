import { Spinner } from "@phosphor-icons/react";

import { PracticalClassItem } from "./PracticalClassItem"

import type { PracticalClassesData } from "../../pages/practical-classes/index.page";

interface PracticalClassesListProps {
  practicalClassesData?: PracticalClassesData[]
  isLoading: boolean
}

export function PracticalClassesList({ practicalClassesData, isLoading }: PracticalClassesListProps) {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-black font-semibold text-lg">Listagem de Aulas Práticas</h1>

      <div>
        {isLoading ? (
        <Spinner size={60} className="animate-spin mx-auto"/>
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
            <span className="text-lg text-black font-bold">Nenhuma aula prática marcada ainda!</span>
          )
        )}
      </div>
    </div>
  )
}