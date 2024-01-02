'use client'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CreateCodeExamForm } from './CreateCodeExamForm'

export interface CreateCodeExamMutation {
  studentId: string
  testDate: string
  testHour: string
  status: 'APPROVED' | 'DISAPPROVED' | 'MARKED'
}

interface CreateCodeExamModalProps {
  students: {
    value: string
    label: string
  }[]
}

export function CreateCodeExamModal({ students }: CreateCodeExamModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className="w-72 rounded bg-[#E3000F] px-7 py-[0.375rem] text-white transition-colors duration-300 enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60">
        Marcar Exame de código
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle>Marcar um exame de código para um aluno</DialogTitle>
          <DialogDescription>
            Para marcar o exame preencha os campos abaixo
          </DialogDescription>
        </DialogHeader>

        <CreateCodeExamForm
          students={students}
          setIsModalOpen={setIsModalOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
