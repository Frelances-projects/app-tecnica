'use client'
import { Pencil } from 'lucide-react'
import { AxiosError } from 'axios'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useToast } from '../ui/use-toast'

import { api } from '@/lib/api'
import { Student } from '@/utils/interfaces/student'
import { errorMessages } from '@/utils/errors/errorMessages'
import { EditStudentForm } from './EditStudentForm'

export interface EditStudentFormInput {
  student_name: string
  student_school?: string
  student_number: string
  student_phone?: string
  student_category_card?: string
  student_email: string
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
}

export function EditStudentModal({
  student,
  categoryCard,
  schools,
}: EditStudentModalProps) {
  const { toast } = useToast()

  async function handleEditStudent(data: EditStudentFormInput) {
    try {
      await api.put(`/student/${student.id}`, {
        name: data.student_name ?? student.name,
        email: data.student_email ?? student.email,
        schoolId: data.student_school ?? student.schoolId,
        driverLicenseCategoryId:
          data.student_category_card ?? student.driverLicenseCategoryId,
        // enrolledAt: data.student_enrolled_at && data.student_enrolled_at.trim() !== '' ? String(new Date(data.student_enrolled_at).toISOString()) : String(new Date(student.enrolledAt).toISOString()),
        number: Number(data.student_number) ?? Number(student.number),
        phone: `+351${data.student_phone}` ?? student.phone,
      })

      toast({
        title: 'Dados do estudante atualizados!',
        description: 'Todos os dados do estudante foram atualizados',
      })

      location.reload()
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          if (
            error.response?.data.message ===
            errorMessages.emailHasAlreadyBeenUsed
          ) {
            return toast({
              title: 'Error!',
              description:
                'Esse E-mail já está sendo utilizando, por favor coloque outro E-mail',
              variant: 'destructive',
            })
          } else if (
            error.response?.data.message ===
            errorMessages.numberHasAlreadyBeenUsed
          ) {
            return toast({
              title: 'Error!',
              description:
                'Esse número já está sendo utilizado, por favor coloque outro',
              variant: 'destructive',
            })
          }
        } else {
          return toast({
            title: 'Error!',
            description:
              'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
            variant: 'destructive',
          })
        }
      } else {
        toast({
          title: 'Error!',
          description:
            'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
          variant: 'destructive',
        })
      }
    }
  }

  const paymentMethod = [
    { value: 'INCASH', label: 'Pronto Pagamento' },
    { value: 'INSTALLMENTS', label: 'Prestações' },
  ]

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Pencil size={16} className="hover:cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-xl overflow-y-auto">
        <h1 className="text-lg font-bold">Editar aluno: {student.name}</h1>

        <EditStudentForm
          studentName={student.name}
          studentEmail={student.email}
          studentNumber={student.number}
          studentPhone={student.phone}
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
