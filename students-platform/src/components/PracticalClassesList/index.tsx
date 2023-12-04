import { CheckCircle, Spinner, Warning, WarningCircle, XCircle } from "@phosphor-icons/react";

import { PracticalClassItem } from "./PracticalClassItem"

import type { ScheduledClass } from "../../pages/practical-classes/index.page";

interface PracticalClassesListProps {
  practicalClassesData?: ScheduledClass[]
  isLoading: boolean
}

export function PracticalClassesList({ practicalClassesData, isLoading }: PracticalClassesListProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center">
        <Warning size={24} color="#c0a717" weight="fill" />
        <span className="ml-2 text-sm font-bold">Para desmarcar aulas contacta a tua escola.</span>
      </div>

      <div className="flex flex-col items-start">
        <div className="flex items-center">
          <CheckCircle size={24} color="#00A300" weight="fill" />
          <span className="text-sm">: Aula confirmada/Aula concluida</span>
        </div>

        <div className="flex items-center">
          <XCircle size={24} color="#CC0000" weight="fill" />
          <span className="text-sm">: Aula Desmarcada</span>
        </div>

        <div className="flex items-center">
          <WarningCircle size={24} color="#FDDA0D" weight="fill" />
          <span className="text-sm">: Aula pendente</span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-y-4 items-start">
        {isLoading ? (
        <Spinner size={60} className="animate-spin mx-auto"/>
        ) : (
          practicalClassesData && practicalClassesData.length > 0 ? (
            practicalClassesData?.map(lesson => (
              <PracticalClassItem 
                key={lesson.id}
                scheduledPracticalClassId={lesson.id}
                title={lesson.class.name} 
                date={lesson?.schedulingDate!!}
                hour={lesson.schedulingHour!!}
                status={lesson?.status!!}
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