'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { CreateCodeExamFormInput } from './CreateCodeExamForm'

export async function createCodeExam(data: CreateCodeExamFormInput) {
  try {
    await api.post(`/test/${data.studentId}`, {
      testDate: new Date(data.testDate).toISOString(),
      testHour: data.testHour,
      place: data?.place,
      category: 'THEORETICAL',
      status: 'MARKED',
      instructorId: data.instructorId,
    })

    revalidatePath('/panel/code-exams')

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        message:
          'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
      }
    }
    return {
      message:
        'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
    }
  }
}
