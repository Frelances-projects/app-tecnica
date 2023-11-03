'use client'
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { useToast } from "@/components/ui/use-toast";
import { CreateScheduledDrivingLessonForm } from "./CreateScheduledDrivingLessonForm";

import { Class } from "@/utils/interfaces/class";

type AxiosData = {
  classes: Class[]
}

interface CreateScheduleDrivingClassModalProps {
  students: {
    value: string;
    label: string;
  }[]
}

export function CreateScheduleDrivingClassModal({ students }: CreateScheduleDrivingClassModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showCreateScheduledForm, setShowCreateScheduledForm] = useState(false)
  const [lessons, setLessons] = useState<Class[]>([])
  const [selectedLessonId, setSelectedLessonId] = useState<string | undefined>(undefined)

  const { toast } = useToast()

  const { isLoading } = useQuery({ queryKey: ['list-practical-class'], queryFn: async () => 
    {
      try {
        const { data } = await api.get<AxiosData>(`/class/category/class-category`, { params: { category: 'PRACTICAL' } })

        if (data.classes.length === 0) {
          setShowCreateScheduledForm(true)
          return []
        }

        setLessons(data.classes)
        return data.classes
      } catch (error) {
        console.log("🚀 ~ file: index.tsx:22 ~ const{}=useQuery ~ error:", error)
        
        return toast({
          variant: "destructive",
          title: "Erro!",
          description: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
        })
      }
    },
  })

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger
        className="w-52 px-7 py-[0.375rem] rounded bg-[#E3000F] text-white enabled:hover:bg-[#E3000F]/80 disabled:bg-[#E3000F]/60 disabled:cursor-not-allowed transition-colors duration-300"
      >
        Marcar aula
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle>Marcar uma nova aula de condução para um aluno</DialogTitle>
          {showCreateScheduledForm ? (  
            <DialogDescription>Para marcar uma nova aula de condução preencha os campos a seguir</DialogDescription>
          ) : (
            <DialogDescription>
              Selecione uma aula para prosseguir (Se você não encontrar a aula que deseja basta clicar em Confirmar para prosseguir)
            </DialogDescription>
          )}
        </DialogHeader>

        {showCreateScheduledForm ? (
          <CreateScheduledDrivingLessonForm
            selectedLessonId={selectedLessonId}
            setSelectedLessonId={setSelectedLessonId}
            students={students}
            setShowCreateScheduledForm={setShowCreateScheduledForm}
            setIsModalOpen={setIsModalOpen}
          />
        ) : (
          <div className="flex gap-3 items-center">
            <Select
              placeHolder="Selecione a aula"
              data={lessons.map(lesson => { return { label: lesson.name, value: lesson.id } })}
              value={selectedLessonId}
              onChange={(event) => setSelectedLessonId(event.target.value)}
            />

            <Button
              title={isLoading ? "Buscando..." : "Confirmar"}
              onClick={() => setShowCreateScheduledForm(true)}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}