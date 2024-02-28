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

import type { User } from '@/utils/interfaces/user'

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
    number?: string
    school?: {
      id: string
      name: string
      users?: User[]
    }
  }[]
}

export function CreateCodeExamModal({ students }: CreateCodeExamModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className="w-full rounded bg-[#E3000F] px-7 py-[0.375rem] text-white transition-colors duration-300 enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60 lg:w-72">
        Marcar Exame de código
      </DialogTrigger>
      <DialogContent className="w-[95vw] lg:max-w-xl">
        <DialogHeader className="mt-2">
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
