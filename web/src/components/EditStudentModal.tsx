import { useForm } from "react-hook-form"

import { Pencil } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Select } from "./Select"
import { InputEditModal } from "./InputEditModal"

export interface Inputs {
  student_name: string
  student_number: string
  student_email: string
  student_date: string
  student_register: string
  payment_method: string
  category: string
}

interface EditStudentModalProps {
  id: string
  name: string
}

export function EditStudentModal({ name, id }: EditStudentModalProps) {
  const {
    register,
    handleSubmit,
  } = useForm<Inputs>()

  const handleEditStudent = (data:Inputs ) => {
    console.log(id)
  }

  const paymentMethod = [
    {value:"INCASH", label:"Pronto Pagamento"},
    {value:"INSTALLMENTS", label:"Prestações"},
  ]

  return (
    <AlertDialog>
    <AlertDialogTrigger>
      <Pencil size={16} className="hover:cursor-pointer" />
    </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-xl overflow-y-auto">
        <h1 className="font-bold text-lg">Editar aluno: {name}</h1>
        <form onSubmit={handleSubmit(handleEditStudent)}
          className="flex flex-col gap-[2.08rem] mt-5 mb-4"
        >
            
          <InputEditModal
            type="text"
            placeholder="Nome do Aluno"
            {...register('student_name')}
          />

          <InputEditModal
            type="text"
            placeholder="Número do Aluno"
            {...register('student_number')}
          />

          <InputEditModal
            type="text"
            placeholder="E-mail do Aluno"
            {...register('student_email')}
          />

          <div className="flex gap-4">
            <Select id="category" placeHolder="Categoria de Carta" data={[{value: '1', label: 'teste'}]} className="w-full" />

            <Select id="payment_method" placeHolder="Método de Pagamento" data={paymentMethod} className="w-full" />
          </div>
        </form>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction type="submit" className="bg-[#E3000F] enabled:hover:bg-[#E3000F]/80 disabled:bg-[#E3000F]/60 disabled:cursor-not-allowed transition-colors duration-300">Editar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}