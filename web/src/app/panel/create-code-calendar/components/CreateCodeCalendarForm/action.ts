'use server'
import { cookies } from 'next/headers'
import { AxiosError } from "axios"

import { api } from "@/lib/api"
import { supabase } from "@/lib/supabase"

import { errorMessages } from "@/utils/errors/errorMessages"

export async function createCodeCalendar(data: FormData) {
  try {
    const user = cookies().get('user')?.value
    const formattedUser = JSON.parse(user!)

    const pdfFile = data.get('file_input') as File

    const supabaseResponse = await supabase.storage
      .from('pdfs-calendar')
      .upload(formattedUser.schoolId, pdfFile, { upsert: true })

    if (supabaseResponse.error) {
      return { message: 'Ocorreu um erro ao salvar o arquivo, por favor tente novamente mais tarde' }
    }
    
    const { data: { publicUrl } } = supabase.storage
      .from('pdfs-calendar')
      .getPublicUrl(supabaseResponse.data.path)

    await api.post('/calendar', { schoolId: formattedUser.schoolId, fileUrl: publicUrl })
    
    return { message: 'Success!' }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        if (error.response?.data.message[0] === errorMessages.schoolIdMustBeUUID) {
          return { message: 'Parece que a plataforma na sua escola está fora do ar! Por favor tente novamente mais tarde' }
        } else if (error.response?.data.message[0] === errorMessages.schoolIdShouldNotBeEmpty) {
          return { message: 'Por favor, informe a escola' }
        }
      }
    }
    return { message: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde' }
  }
}