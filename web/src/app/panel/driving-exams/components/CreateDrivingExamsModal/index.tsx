'use client'
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { CreateDrivingExamForm } from "./CreateDrivingExamForm";

import { api } from "@/lib/api";

export interface CreateDrivingExamMutation {
  studentId: string
  testDate: string
  testHour: string
  status: 'APPROVED' | 'DISAPPROVED' | 'MARKED'
}

interface CreateDrivingExamModalProps {
  students: {
    value: string;
    label: string;
  }[]
}

export function CreateDrivingExamsModal({ students }: CreateDrivingExamModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { mutateAsync: createDrivingExam } = useMutation(
    {
      mutationFn: async (
        {
          studentId,
          testDate,
          testHour,
          status,
        }: CreateDrivingExamMutation) => 
        {
          const { data } = await api.post(`/test/${studentId}`, 
            {
              testDate,
              testHour,
              category: 'PRACTICAL',
              status
            }
          )

          return data.test
        }
    }
  )

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger
        className="w-72 px-7 py-[0.375rem] rounded bg-[#E3000F] text-white enabled:hover:bg-[#E3000F]/80 disabled:bg-[#E3000F]/60 disabled:cursor-not-allowed transition-colors duration-300"
      >
        Marcar Exame de condução
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle>Marcar um exame de condução para um aluno</DialogTitle>
          <DialogDescription>
            Para marcar o exame preencha os campos abaixo
          </DialogDescription>
        </DialogHeader>

        <CreateDrivingExamForm
          students={students}
          setIsModalOpen={setIsModalOpen}
          createDrivingExam={createDrivingExam}
        />
      </DialogContent>
    </Dialog>
  )
}