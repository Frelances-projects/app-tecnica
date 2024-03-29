'use client'
import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { EditStudentFormInput } from '../EditStudentModal'
import { InputModal } from '../InputModal'
import { Select } from '../Select'

interface EditStudentFormProps {
  children: ReactNode
  studentName: string
  studentEmail: string
  studentNumber: number
  studentPhone?: string
  studentImtId?: string
  categoryCard: {
    value: string
    label: string
    schoolId: string
  }[]
  schools: {
    value: string
    label: string
  }[]
  handleEditStudent: (data: EditStudentFormInput) => Promise<void>
}

export function EditStudentForm({
  children,
  studentName,
  studentEmail,
  studentNumber,
  studentPhone,
  studentImtId,
  schools,
  categoryCard,
  handleEditStudent,
}: EditStudentFormProps) {
  const { register, setValue, handleSubmit } = useForm<EditStudentFormInput>({
    defaultValues: {
      student_name: studentName,
      student_email: studentEmail,
      student_number: String(studentNumber),
      student_phone: studentPhone,
      student_imt_id: studentImtId,
    },
  })

  return (
    <form
      onSubmit={handleSubmit(handleEditStudent)}
      className="mb-4 mt-5 flex flex-col gap-[2.08rem]"
    >
      <InputModal
        type="text"
        placeholder="Nome do Aluno"
        {...register('student_name')}
      />

      <InputModal
        type="number"
        placeholder="Número do Aluno"
        {...register('student_number')}
      />

      <InputModal
        type="number"
        placeholder="Telefone do aluno"
        {...register('student_phone')}
      />

      <InputModal
        type="email"
        placeholder="E-mail do Aluno"
        {...register('student_email')}
      />

      <InputModal
        type="text"
        placeholder="ID Escola"
        {...register('student_imt_id')}
      />

      {/* <InputModal
        {...register('student_enrolled_at')}
        id="student_date"
        type='date'
        placeholder="Data de Inscrição"
      /> */}

      <div className="flex gap-4">
        <Select
          id="school"
          placeHolder="Escola de registro"
          data={schools}
          className="w-full"
          onChange={(event) => setValue('student_school', event.target.value)}
        />

        <Select
          id="category"
          placeHolder="Categoria de Carta"
          data={categoryCard}
          className="w-full"
          onChange={(event) =>
            setValue('student_category_card', event.target.value)
          }
        />

        {/* <Select id="payment_method" placeHolder="Método de Pagamento" data={paymentMethod} className="w-full" /> */}
      </div>

      {children}
    </form>
  )
}
