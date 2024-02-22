'use client'
import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CreateScheduledDrivingLessonForm } from './CreateScheduledDrivingLessonForm'

import type { User } from '@/utils/interfaces/user'

interface CreateScheduleDrivingClassModalProps {
  students: {
    value: string
    label: string
    number?: string
    vehicles?: string[]
    school?: {
      id: string
      name: string
      users?: User[]
    }
  }[]
}

export function CreateScheduleDrivingClassModal({
  students,
}: CreateScheduleDrivingClassModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className="w-full rounded bg-[#E3000F] px-7 py-[0.375rem] text-white transition-colors duration-300 enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60 lg:w-52">
        Marcar aula
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="h-max max-h-[95vh] w-max max-w-[95vw] overflow-y-auto md:max-w-xl">
          <DialogHeader className="mt-auto">
            <DialogTitle>
              Marcar uma nova aula de condução para um aluno
            </DialogTitle>
            <DialogDescription>
              Para marcar uma nova aula de condução preencha os campos a seguir
            </DialogDescription>
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
