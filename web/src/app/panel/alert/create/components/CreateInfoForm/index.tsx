'use client'
import { useRef } from 'react'

import { Button } from '@/components/Button'
import { WrapperItem } from '@/components/WrapperItem'
import { useToast } from '@/components/ui/use-toast'

import { registerInfo } from './action'
import { ItemInputForm } from '@/components/ItemInputForm'
import { ItemSelectForm } from '@/components/ItemSelectForm'

interface CreateInfoFormProps {
  userFunction: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
  schools: {
    label: string
    value: string
  }[]
}

export function CreateInfoForm({ userFunction, schools }: CreateInfoFormProps) {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)

  async function handleCreateInfo(data: FormData) {
    const { message } = await registerInfo(data)

    if (message === 'Success!') {
      formRef?.current?.reset()

      toast({
        title: 'Novo alerta cadastrado!',
        description: 'Alerta cadastrado com sucesso!',
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro!',
        description: message,
      })
    }
  }

  return (
    <form
      ref={formRef}
      action={handleCreateInfo}
      className="mt-6 flex w-full flex-col gap-6 px-4"
    >
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
        id="title"
        label="Título do Alerta"
        placeholder="Insira o Título"
        type="text"
      />

      <ItemInputForm
        required
        id="date"
        label="Data do alerta"
        placeholder="Selecione a data"
        type="date"
      />

      <WrapperItem htmlFor="description" label="Descrição do Alerta">
        <textarea
          id="description"
          name="description"
          minLength={5}
          maxLength={460}
          required
          className="h-[142px] w-full rounded-lg border border-[#C6C6C6] bg-white px-2 py-[0.375rem] text-black outline-none lg:w-[520px]"
        />
      </WrapperItem>

      <Button type="submit" title="Publicar" className="ml-auto" />
    </form>
  )
}
