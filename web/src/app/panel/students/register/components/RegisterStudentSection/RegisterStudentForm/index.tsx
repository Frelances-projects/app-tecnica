'use client'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/Button'
import { ItemInputForm } from '@/components/ItemInputForm'
import { ItemSelectForm } from '@/components/ItemSelectForm'
import { useToast } from '@/components/ui/use-toast'

import { createStudent } from './action'

interface RegisterStudentFormProps {
  categoryCard: {
    value: string
    label: string
    schoolId: string
  }[]
  schools: {
    value: string
    label: string
  }[]
}

export function RegisterStudentForm({
  categoryCard,
  schools,
}: RegisterStudentFormProps) {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  const [categoryCardState, setCategoryCardState] = useState(categoryCard)
  const [selectedSchool, setSelectedSchool] = useState<undefined | string>(
    undefined,
  )
  const [selectedCategoryCard, setSelectedCategoryCard] = useState<
    undefined | string
  >(undefined)

  const paymentMethod = [
    { value: 'INCASH', label: 'Pronto Pagamento' },
    { value: 'INSTALLMENTS', label: 'Prestações' },
  ]

  async function handleCreateStudent(data: FormData) {
    const { message } = await createStudent(data)

    if (message === 'Success!') {
      formRef?.current?.reset()
      setSelectedSchool(undefined)
      setSelectedCategoryCard(undefined)

      toast({
        title: 'Estudante cadastrado!',
        description: 'Estudante cadastrado com sucesso!',
      })
    } else {
      toast({
        title: 'Erro!',
        description: message,
        variant: 'destructive',
      })
    }
  }

  // useEffect(() => {
  //   if (selectedSchool) {
  //     setCategoryCardState(categoryCard.filter(category => category.schoolId === selectedSchool))
  //     setSelectedCategoryCard(undefined)
  //   }
  // }, [selectedSchool, categoryCard])

  return (
    <form
      ref={formRef}
      action={handleCreateStudent}
      className="mb-4 mt-5 flex flex-col gap-[2.08rem]"
    >
      <ItemInputForm
        required
        id="student_name"
        label="Nome do Aluno"
        type="text"
        placeholder="Nome Aluno"
      />

      <ItemInputForm
        required
        id="student_number"
        label="Número do Aluno"
        type="number"
        placeholder="Número Aluno"
      />

      <ItemInputForm
        required
        id="student_phone"
        label="Telefone do Aluno"
        type="number"
        placeholder="Telefone Aluno"
      />

      <ItemInputForm
        required
        id="student_email"
        label="E-mail do Aluno"
        type="email"
        placeholder="Email Aluno"
      />

      <ItemInputForm
        required
        id="student_birth_date"
        label="Data de nascimento do aluno"
        type="date"
        placeholder="Data de nascimento"
      />

      <ItemInputForm
        required
        id="student_date"
        label="Data de inscrição do Aluno"
        type="date"
        placeholder="Data de Inscrição"
      />

      <ItemSelectForm
        required
        id="student_register"
        label="Escola de Registo do Aluno"
        data={schools}
        value={selectedSchool}
        onChange={(event) => setSelectedSchool(event.target.value)}
      />

      <ItemSelectForm
        required
        id="category"
        label="Categoria de Carta"
        data={categoryCardState}
        value={selectedCategoryCard}
        onChange={(event) => setSelectedCategoryCard(event.target.value)}
      />

      <ItemSelectForm
        required
        id="payment_method"
        label="Método de Pagamento"
        data={paymentMethod}
      />

      <div className="flex justify-end">
        <Button title="Adicionar" type="submit" />
      </div>
    </form>
  )
}
