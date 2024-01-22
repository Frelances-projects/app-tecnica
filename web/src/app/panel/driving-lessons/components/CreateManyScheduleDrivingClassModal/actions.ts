'use server'
import { revalidatePath } from 'next/cache'

import { api } from '@/lib/api'

import type { CreateManyScheduledDrivingLessonInputs } from './CreateManyScheduledDrivingLessonForm'

export async function createManyScheduledDrivingLesson(
  data: CreateManyScheduledDrivingLessonInputs,
) {
  try {
    await api.post('/scheduled-class/practical-class/create-many', {
      totalClasses: Number(data.totalClasses),
      studentId: data.studentId,
    })

    revalidatePath('/panel/driving-lessons')

    return { message: 'Success!' }
  } catch (error) {
    // if (error instanceof AxiosError) {

    // }
    return {
      message:
        'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
    }
  }
}
