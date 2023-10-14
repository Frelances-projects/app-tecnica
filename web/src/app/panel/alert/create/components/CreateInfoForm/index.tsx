"use client"
import { useRef } from "react";

import { Button } from "@/components/Button";
import { WrapperItem } from "@/components/WrapperItem";
import { useToast } from "@/components/ui/use-toast";

import { registerInfo } from "./action";
import { ItemInputForm } from "@/components/ItemInputForm";
import { ItemSelectForm } from "@/components/ItemSelectForm";

interface CreateInfoFormProps {
  userFunction: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
  schools: {
    label: string
    value: string
  }[]
}

export function CreateInfoForm({ userFunction, schools }: CreateInfoFormProps) {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null);

  async function handleCreateInfo(data: FormData) {
    const { message } = await registerInfo(data)

    if (message === 'Success!') {
      formRef?.current?.reset();
      
      toast({
        title: 'Novo alerta cadastrado!',
        description: 'Alerta cadastrado com sucesso!'
      })
    } else {
      toast({
        variant: "destructive",
        title: "Erro!",
        description: message,
      })
    }
  }

  return (
    <form ref={formRef} action={handleCreateInfo} className='flex flex-col gap-6 min-w-[710px] mt-6 pl-10'>
      {userFunction === 'DIRECTOR' && (
        <ItemSelectForm
          required
          id="select_school"
          label="Escola do alerta"
          data={schools}
        />
      )}
      
      <ItemInputForm
        required
        id='title'
        label="Título do Alerta"
        placeholder='Digite o Título'
        type='text'
      />

      <ItemInputForm
        required
        id='date'
        label="Data do alerta"
        placeholder="Selecione a data"
        type='date'
      />

      <WrapperItem htmlFor="description" label="Descrição do Alerta">
        <textarea
          id='description'
          name="description"
          minLength={5}
          maxLength={460}
          required
          className='w-[520px] h-[142px] bg-white border border-[#C6C6C6] outline-none rounded-lg px-2 py-[0.375rem] text-black'
        />
      </WrapperItem>

      <Button type='submit' title='Publicar' className='ml-auto' />
    </form>
  )
}