'use client'
import { useState } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreateScheduledDrivingLessonForm } from "./CreateScheduledDrivingLessonForm";

interface CreateScheduleDrivingClassModalProps {
  students: {
    value: string;
    label: string;
  }[]
}

export function CreateScheduleDrivingClassModal({ students }: CreateScheduleDrivingClassModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger
        className="w-52 px-7 py-[0.375rem] rounded bg-[#E3000F] text-white enabled:hover:bg-[#E3000F]/80 disabled:bg-[#E3000F]/60 disabled:cursor-not-allowed transition-colors duration-300"
      >
        Marcar aula
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="w-full max-w-xl overflow-auto">
          <DialogHeader>
            <DialogTitle>Marcar uma nova aula de condução para um aluno</DialogTitle>
            <DialogDescription>Para marcar uma nova aula de condução preencha os campos a seguir</DialogDescription>
          </DialogHeader>
          
          <CreateScheduledDrivingLessonForm
            students={students}
            setIsModalOpen={setIsModalOpen}
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}