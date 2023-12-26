'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'
import { errorMessages } from '@/utils/errors/errorMessages'

export async function deleteDriverLicenseCategory(
  driverLicenseCategoryId: string,
) {
  try {
    await api.delete(`/driver-license-category/${driverLicenseCategoryId}`)

    revalidatePath('/panel/prices/list')

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (
          error.response?.data.message ===
          errorMessages.driverLicenseCategoryNotFound
        ) {
          return {
            message:
              'Categoria não encontrada! Parece que essa categoria já foi deletada!',
          }
        }
      }
    }
    return {
      message:
        'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
    }
  }
}
