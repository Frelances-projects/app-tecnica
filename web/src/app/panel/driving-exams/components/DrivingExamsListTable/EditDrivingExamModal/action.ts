'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { errorMessages } from '@/utils/errors/errorMessages'

import type { EditDrivingExamFormInputs } from './EditDrivingExamForm'

interface EditCodeExamData {
  testId: string
  data: EditDrivingExamFormInputs
  testDateNotFormatted: string
}

export async function editDrivingExam({
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

    revalidatePath('/panel/driving-exams')

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (error.response?.data.message === errorMessages.testNotFound) {
          return {
            message: 'Parece que esse exame de condução já foi deletado!',
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
