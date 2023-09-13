'use client'

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";

import Image from "next/image";
import PdfIcon from '../../assets/PDF-Icon.svg'

export default function CreateCodeCalendar() {
  const [file, setFile] = useState<File | undefined>(undefined)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files!![0]
    const maxSize = 10 * 1024 * 1024 // 10MB
    
    if (file && file.size <= maxSize) {
      setFile(event.target.files!![0] as File)
    } else {
      return window.alert('Imagem muito grande!, Por favor selecione uma imagem de até 10mb')
    }
  }

  return (
    <div className="w-full max-w-[810px] flex flex-col gap-3 mt-14 mb-16">
      <h1 className='text-lg'>Adicionar Calendário Código</h1>
      <div className='mx-auto -mt-1 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <form className="flex flex-col gap-[2.08rem] mr-auto mt-16 pl-10">
        <Select />
        <div className="flex gap-9 items-end">
          <fieldset className="bg-[#F0F0F0] border border-dashed border-[#CDCDCD] px-3 py-3 w-32 rounded">
            <label htmlFor="fileInput" className="flex gap-3 items-center cursor-pointer">
              <Image src={PdfIcon} alt='PDF File' />
              <p className="text-black text-xs font-bold underline">{file ? file?.name : 'Ficheiro' }</p>
            </label>
            <input id='fileInput' accept=".pdf" name='fileInput' onChange={handleFileChange} type="file" className="hidden"/>
          </fieldset>
          <Button title="Adicionar" type='submit' className="h-max"/>
        </div>
      </form>
    </div>

  )
}