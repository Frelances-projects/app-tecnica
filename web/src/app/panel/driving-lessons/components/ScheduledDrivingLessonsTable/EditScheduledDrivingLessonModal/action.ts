'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { errorMessages } from '@/utils/errors/errorMessages'

import type { EditScheduledClassInputs } from './EditScheduledClassForm'

interface EditScheduledDrivingLessonData {
  scheduledClassId: string
  data: EditScheduledClassInputs
  classId: string
  schedulingDateNotFormatted: string
}

export async function editScheduledDrivingLesson({
  scheduledClassId,
  data,
  classId,
  schedulingDateNotFormatted,
}: EditScheduledDrivingLessonData) {
  try {
    await api.put(`/scheduled-class/${scheduledClassId}`, {
      schedulingDate: data.schedulingDate
        ? new Date(data.schedulingDate).toISOString()
        : new Date(schedulingDateNotFormatted).toISOString(),
      schedulingHour: data.schedulingHour,
      status: data.status,
      classId,
      vehicle: data.vehicle,
      instructorId: data.instructorId,
    })

    revalidatePath('/panel/driving-lessons')

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (
          error.response?.data.message === errorMessages.scheduledClassNotFound
        ) {
          return {
            message: 'Parece que essa marcação já foi deletada!',
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
