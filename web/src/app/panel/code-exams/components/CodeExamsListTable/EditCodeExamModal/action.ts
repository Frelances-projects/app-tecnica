'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { errorMessages } from '@/utils/errors/errorMessages'

import type { EditCodeExamInputs } from './EditCodeExamForm'

interface EditCodeExamData {
  testId: string
  data: EditCodeExamInputs
  testDateNotFormatted: string
}

export async function editCodeExam({
  testId,
  data,
  testDateNotFormatted,
}: EditCodeExamData) {
  try {
    await api.put(`/test/${testId}`, {
      testDate: data.testDate
        ? new Date(data.testDate).toISOString()
        : new Date(testDateNotFormatted!).toISOString(),
      testHour: data.testHour,
      status: data.status,
      instructorId: data.instructorId,
    })

    revalidatePath('/panel/code-exams')

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
