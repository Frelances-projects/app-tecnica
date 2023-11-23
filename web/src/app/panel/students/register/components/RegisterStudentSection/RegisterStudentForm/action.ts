'use server'
import { revalidatePath } from 'next/cache'
import { AxiosError } from "axios"

import { api } from "@/lib/api"
import { errorMessages } from "@/utils/errors/errorMessages"

export async function createStudent(data: FormData) {
  try {
    const name = data.get('student_name')?.toString()
    const number = data.get('student_number')?.toString()
    const phone = data.get('student_phone')?.toString()
    const email = data.get('student_email')?.toString()
    const date = data.get('student_date')?.toString()
    const schoolId = data.get('student_register')?.toString()
    const driverLicenseCategoryId = data.get('category')?.toString()
    const paymentMethod = data.get('payment_method')?.toString()

    await api.post(`/student`,
      { 
        name,
        number: Number(number),
        phone: `+351${phone}`,
        email,
        enrolledAt: String(new Date(date!!).toISOString()),
        schoolId,
        driverLicenseCategoryId,
        paymentMethod
      }
    )

    revalidatePath('/panel/students/list')

    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (error.response?.data.message === errorMessages.emailHasAlreadyBeenUsed) {
          return { message: 'Esse E-mail já está sendo utilizando, por favor coloque outro E-mail' }
        } else if (error.response?.data.message === errorMessages.emailAndNumberHasAlreadyBeenUsed) {
          return { message: 'Esse E-mail e esse número já estão sendo utilizados, por favor coloque outros' }
        } else if (error.response?.data.message === errorMessages.numberHasAlreadyBeenUsed) {
          return { message: 'Esse número já está sendo utilizado, por favor coloque outro' }
        }
      }
    }
    return { message: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde' }
  }
}