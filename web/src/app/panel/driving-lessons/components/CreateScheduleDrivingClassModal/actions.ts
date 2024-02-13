'use server'
import { revalidatePath } from 'next/cache'

import { api } from '@/lib/api'

import type { CreateScheduledDrivingLessonInputs } from './CreateScheduledDrivingLessonForm'

export async function createScheduledDrivingLesson(
  data: CreateScheduledDrivingLessonInputs,
) {
  try {
    for (const lesson of data.lessons) {
      await api.post('/scheduled-class/practical-class', {
        schedulingDate: new Date(lesson.schedulingDate).toISOString(),
        className: lesson.lessonName,
        classDescription: lesson.lessonDescription,
        studentId: lesson.studentId,
        schedulingHour: lesson.schedulingHour,
        status: 'PENDING',
        vehicle: lesson.vehicle,
        instructorId: lesson.instructorId,
      })
    }

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
