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
import { ItemSelectForm } from "./ItemSelectForm"

export interface Inputs {
  student_name: string
  student_number: string
  student_email: string
  student_date: string
  student_register: string
  payment_method: string
  category: string
}

interface EditModalProps {
  id: string
  name: string
}

export function EditModal({ name, id }: EditModalProps) {
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
              
            <input
              type="text"
              placeholder="Nome do Aluno"
              className="border w-full border-[#C6C6C6] outline-none flex items-center justify-between bg-white rounded-lg px-2 py-[0.375rem] text-black"
              {...register('student_name')}
            />
            <input
              type="text"
              placeholder="Número do Aluno"
              className="border w-full border-[#C6C6C6] outline-none flex items-center justify-between bg-white rounded-lg px-2 py-[0.375rem] text-black"
              {...register('student_number')}
            />
            <input
              type="text"
              placeholder="E-mail do Aluno"
              className="border w-full border-[#C6C6C6] outline-none flex items-center justify-between bg-white rounded-lg px-2 py-[0.375rem] text-black"
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