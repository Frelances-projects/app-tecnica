'use client'
import { ReactNode, useState } from "react"

import { InputEditModal } from "@/components/InputEditModal";
import { useToast } from "@/components/ui/use-toast";

import { updateInfo } from "./action";

import { Information } from "@/utils/interfaces/information";

interface EditInformationFormProps {
  information: Information
  children: ReactNode
}

export function EditInformationForm({ information, children }: EditInformationFormProps) {
  const { toast } = useToast()

  const [name, setName] = useState(information.name)
  const [description, setDescription] = useState(information.description)
  const [date, setDate] = useState(information.date)

  async function handleUpdateInfo(data: FormData) {
    if ((name.trim() === '') || (description.trim() === '')) {
      return toast({
        title: 'Informações obrigatórias',
        description: 'Todas as informações são obrigatórias, você não pode atualizar uma informação com os campos vazios',
        variant: 'destructive'
      })
    }
    
    if (
      (name.trim() === information.name) &&
      (description.trim() === information.description.trim()) &&
      (date === information.date))
      {
        console.log("🚀 ~ file: index.tsx:46 ~ handleUpdateInfo ~ date === information.date:", date === information.date, { date, old: information.date })
      return toast({
        title: 'Informação não alterada!',
        description: 'Antes de clicar no botão de Editar, por favor, altere alguma informação',
        variant: 'destructive'
      })
    }
    
    const { message } = await updateInfo(data, information.id)

    if (message === 'Success!') {
      toast({
        title: 'Informação atualizada!',
        description: 'Informação atualizada com sucesso!',
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
      action={handleUpdateInfo}
      className="flex flex-col gap-[2.08rem] mt-5 mb-4"
    >
      <InputEditModal
        id='title'
        name='title'
        type="text"
        placeholder="Título do Alerta"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <InputEditModal
        id='alert_date'
        name='alert_date'
        type="date"
        placeholder="Data do alerta"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <textarea
        id='description'
        name='description'
        placeholder="Descrição do alerta"
        minLength={5}
        maxLength={460}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className='h-[142px] bg-white border border-[#C6C6C6] outline-none rounded-lg px-2 py-[0.375rem] text-black'
      />

      {children}
    </form>
  )
}