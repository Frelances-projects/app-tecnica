'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { CreateDrivingExamFormInput } from './CreateDrivingExamForm'

export async function createDrivingExam(data: CreateDrivingExamFormInput) {
  try {
    await api.post(`/test/${data.studentId}`, {
      status: 'MARKED',
      studentId: data.studentId,
      testDate: new Date(data.testDate).toISOString(),
      testHour: data.testHour,
      place: data?.place,
      category: 'PRACTICAL',
      instructorId: data.instructorId,
    })

    revalidatePath('/panel/driving-exams')

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
