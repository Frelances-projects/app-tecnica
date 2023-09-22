'use client'
import { ChangeEvent, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/Button";
import { useToast } from "@/components/ui/use-toast";

import { createCodeCalendar } from "./action";

import PdfIcon from '../../../../../assets/PDF-Icon.svg'

export function CreateCodeCalendarForm() {
  const { toast } = useToast()

  const [file, setFile] = useState<File | undefined>(undefined)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files!![0]
    const maxSize = 4 * 1024 * 1024 // 4MB
    
    if (file && file.size <= maxSize) {
      setFile(event.target.files!![0] as File)
    } else {
      return toast({
        title: 'Arquivo muito grande!',
        description: 'Por favor selecione um arquivo de até 4MB',
        variant: 'destructive'
      })
    }
  }

  async function handleCreateCodeCalendar(data: FormData) {
    if (!file) {
      return toast({
        title: 'Arquivo não selecionado!',
        description: 'Por favor selecione um arquivo de até 4MB',
        variant: 'destructive'
      })
    }

    const { message } = await createCodeCalendar(data)

    if (message === 'Success!') {
      setFile(undefined)

      toast({
        title: 'PDF enviado!',
        description: 'PDF enviado com sucesso!'
      })
    } else {
      toast({
        title: 'Erro para salvar o PDF!',
        description: message,
        variant: 'destructive'
      })
    }
  }
  
  return (
    <form
      action={handleCreateCodeCalendar}
      className="flex flex-col gap-[2.08rem] mr-auto mt-16 pl-10"
    >
      <div className="flex gap-9 items-end">
        <fieldset
          className="bg-[#F0F0F0] border border-dashed border-[#CDCDCD] px-3 py-3 w-32 rounded"
        >
          <label htmlFor="fileInput" className="flex gap-3 items-center cursor-pointer">
            <Image src={PdfIcon} alt='PDF File' />
            <p className="text-black text-xs font-bold underline truncate">{file ? file?.name : 'Ficheiro' }</p>
          </label>

          <input
            id='fileInput'
            accept=".pdf"
            name='file_input'
            onChange={handleFileChange}
            type="file"
            className="hidden"
          />
        </fieldset>

        <Button
          title="Adicionar"
          type='submit'
          className="h-max"
        />
      </div>
    </form>
  )
}