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
import { CreateManyScheduledDrivingLessonForm } from './CreateManyScheduledDrivingLessonForm'

import type { User } from '@/utils/interfaces/user'

interface CreateManyScheduleDrivingClassModalProps {
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

export function CreateManyScheduleDrivingClassModal({
  students,
}: CreateManyScheduleDrivingClassModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className="w-full rounded bg-[#E3000F] px-7 py-[0.375rem] text-white transition-colors duration-300 enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60 lg:w-52">
        Aulas anteriores
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="w-max max-w-[95vw] overflow-auto md:max-w-xl">
          <DialogHeader className="mt-2">
            <DialogTitle>
              Marcar aulas de condução passadas para um aluno
            </DialogTitle>
            <DialogDescription>
              Para marcar as aulas de condução preencha os campos a seguir
            </DialogDescription>
          </DialogHeader>

          <CreateManyScheduledDrivingLessonForm
            students={students}
            setIsModalOpen={setIsModalOpen}
          />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
