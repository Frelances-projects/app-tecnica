'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { errorMessages } from '@/utils/errors/errorMessages'

import type { EditStudentFormInput } from '.'
import type { Student } from '@/utils/interfaces/student'

interface EditStudentData {
  data: EditStudentFormInput
  student: Student
}

export async function editStudent({ data, student }: EditStudentData) {
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

    revalidatePath('/panel/students/list')

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (error.response?.data.message === errorMessages.testNotFound) {
          return {
            message: 'Exame de código não encontrado!',
          }
        }
      } else {
        return {
          message:
            'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
        }
      }
    }
    return {
      message:
        'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
    }
  }
}
