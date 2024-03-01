'use client'
import { Pencil } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '../ui/use-toast'

import { Student } from '@/utils/interfaces/student'
import { EditStudentForm } from './EditStudentForm'
import { editStudent } from './action'

export interface EditStudentFormInput {
  student_name: string
  student_school?: string
  student_number: string
  student_phone?: string
  student_category_card?: string
  student_email: string
  student_imt_id?: string
}

interface EditStudentModalProps {
  student: Student
  categoryCard: {
    value: string
    label: string
    schoolId: string
  }[]
  schools: {
    value: string
    label: string
  }[]
  trigger?: boolean
}

export function EditStudentModal({
  student,
  categoryCard,
  schools,
  trigger,
}: EditStudentModalProps) {
  const { toast } = useToast()

  async function handleEditStudent(data: EditStudentFormInput) {
    const { message } = await editStudent({ data, student })

    if (message === 'Success!') {
      toast({
        title: 'Dados do estudante atualizados!',
        description: 'Todos os dados do estudante foram atualizados',
      })
    } else {
      toast({
        title: 'Erro!',
        description: message,
        variant: 'destructive',
      })
    }
  }

  return (
    <AlertDialog>
      {trigger ? (
        <AlertDialogTrigger className="w-full rounded-lg border px-4 py-2 transition-colors duration-200 ease-linear hover:bg-[#E86255] hover:text-white">
          Editar Aluno
        </AlertDialogTrigger>
      ) : (
        <AlertDialogTrigger>
          <Pencil size={16} className="hover:cursor-pointer" />
        </AlertDialogTrigger>
      )}
      <AlertDialogContent className="w-full max-w-2xl overflow-y-auto">
        <h1 className="text-lg font-bold">Editar aluno: {student.name}</h1>

        <EditStudentForm
          studentName={student.name}
          studentEmail={student.email}
          studentNumber={student.number}
          studentPhone={student.phone}
          studentImtId={student.imtId}
          schools={schools}
          categoryCard={categoryCard}
          handleEditStudent={handleEditStudent}
        >
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              className="bg-[#E3000F] transition-colors duration-300 enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60"
            >
              Editar
            </AlertDialogAction>
          </AlertDialogFooter>
        </EditStudentForm>
      </AlertDialogContent>
    </AlertDialog>
  )
}
