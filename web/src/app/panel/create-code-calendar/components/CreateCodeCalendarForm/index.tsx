'use client'
import { ChangeEvent, useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/Button'
import { Select } from '@/components/Select'
import { useToast } from '@/components/ui/use-toast'

import { createCodeCalendar } from './action'

import PdfIcon from '../../../../../assets/PDF-Icon.svg'

interface CreateCodeCalendarFormProps {
  userFunction: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
  schools: {
    label: string
    value: string
  }[]
}

export function CreateCodeCalendarForm({
  schools,
  userFunction,
}: CreateCodeCalendarFormProps) {
  const { toast } = useToast()

  const [file, setFile] = useState<File | undefined>(undefined)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files![0]
    const maxSize = 4 * 1024 * 1024 // 4MB

    if (file && file.size <= maxSize) {
      setFile(event.target.files![0] as File)
    } else {
      return toast({
        title: 'Arquivo muito grande!',
        description: 'Por favor selecione um arquivo de até 4MB',
        variant: 'destructive',
      })
    }
  }

  async function handleCreateCodeCalendar(data: FormData) {
    if (!file) {
      return toast({
        title: 'Arquivo não selecionado!',
        description: 'Por favor selecione um arquivo de até 4MB',
        variant: 'destructive',
      })
    }

    const { message } = await createCodeCalendar(data)

    if (message === 'Success!') {
      setFile(undefined)

      toast({
        title: 'PDF enviado!',
        description: 'PDF enviado com sucesso!',
      })
    } else {
      toast({
        title: 'Erro para salvar o PDF!',
        description: message,
        variant: 'destructive',
      })
    }
  }

  return (
    <form
      action={handleCreateCodeCalendar}
      className="mr-auto mt-16 flex flex-col gap-[2.08rem] pl-10"
    >
      {userFunction === 'DIRECTOR' && (
        <Select
          data={schools}
          placeHolder="Selecione uma escola"
          name="select_school"
        />
      )}

      <div className="flex items-end gap-9">
        <fieldset className="w-32 rounded border border-dashed border-[#CDCDCD] bg-[#F0F0F0] px-3 py-3">
          <label
            htmlFor="fileInput"
            className="flex cursor-pointer items-center gap-3"
          >
            <Image src={PdfIcon} alt="PDF File" />
            <p className="truncate text-xs font-bold text-black underline">
              {file ? file?.name : 'Ficheiro'}
            </p>
          </label>

          <input
            id="fileInput"
            accept=".pdf"
            name="file_input"
            onChange={handleFileChange}
            type="file"
            className="hidden"
          />
        </fieldset>

        <Button title="Adicionar" type="submit" className="h-max" />
      </div>
    </form>
  )
}
