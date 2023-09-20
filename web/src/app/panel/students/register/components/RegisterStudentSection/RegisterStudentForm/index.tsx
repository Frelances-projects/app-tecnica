'use client'
import { useRef } from "react";

import { Button } from "@/components/Button";
import { ItemInputForm } from "@/components/ItemInputForm";
import { ItemSelectForm } from "@/components/ItemSelectForm";
import { useToast } from "@/components/ui/use-toast";

import { createStudent } from "./action";

interface RegisterStudentFormProps {
  categoryCard: {
    value: string;
    label: string;
  }[]
  schools: {
    value: string;
    label: string;
  }[]
}

export function RegisterStudentForm({ categoryCard, schools }: RegisterStudentFormProps) {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null);
  
  const paymentMethod = [
    {value:"INCASH", label:"Pronto Pagamento"},
    {value:"INSTALLMENTS", label:"Prestações"},
  ]

  async function handleCreateStudent(data: FormData) {
    const { message } = await createStudent(data)

    if (message === 'Success!') {
      formRef?.current?.reset();

      toast({
        title: 'Estudante cadastrado!',
        description: 'Estudante cadastrado com sucesso!',
      })
    } else {
      toast({
        title: 'Error!',
        description: message,
        variant: 'destructive'
      })
    }
  }
  
  return (
    <form
      ref={formRef} 
      action={handleCreateStudent}
      className="flex flex-col gap-[2.08rem] mt-5 mb-4"
    >
      <ItemInputForm
        required
        id="student_name"
        label="Nome do Aluno"
        type='text'
        placeholder="Nome Aluno"
      />

      <ItemInputForm
        required
        id="student_number"
        label="Número do Aluno"
        type='number'
        placeholder="Número Aluno"
      />

      <ItemInputForm
        required
        id="student_email"
        label="E-mail do Aluno"
        type='email'
        placeholder="Email Aluno"
      />

      <ItemInputForm
        required
        id="student_date"
        label="Data de inscrição do Aluno"
        type='date'
        placeholder="Data de Inscrição"
      />

      <ItemSelectForm
        required
        id="student_register"
        label="Escola de Registo do Aluno"
        data={schools}
      />

      <ItemSelectForm
        required
        id="category"
        label="Categoria de Carta"
        data={categoryCard}
      />

      <ItemSelectForm
        required
        id="payment_method"
        label="Método de Pagamento"
        data={paymentMethod}
      />

      <div className="flex justify-end">
        <Button title="Adicionar" type='submit' />
      </div>
    </form>
  )
}