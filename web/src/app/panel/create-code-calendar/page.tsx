'use client'

import { ChangeEvent, useState } from "react";
import { Button } from "@/components/Button";
import { SelectComponent } from "@/components/Select";

import Image from "next/image";
import PdfIcon from '../../../assets/PDF-Icon.svg'

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
    <form className="flex flex-col gap-[2.08rem] mr-auto mt-24 mb-16">
      <fieldset className='flex items-center gap-14'>
        <label htmlFor="information-name" className='text-xs'>Nome da Categoria</label>
        <SelectComponent placeHolder='Mes X' data={[]}/>
      </fieldset>
      <div className="flex justify-between items-end">
        <fieldset className="bg-[#F3F3F3] border border-dashed border-red-500 px-3 py-3 w-56 rounded">
          <label htmlFor="fileInput" className="flex gap-8 items-center cursor-pointer">
            <Image src={PdfIcon} alt='PDF File' />
            <p className="text-black text-xs font-bold underline">{file ? file?.name : 'File Browse' }</p>
          </label>
          <input id='fileInput' accept=".pdf" name='fileInput' onChange={handleFileChange} type="file" className="hidden"/>
        </fieldset>
        <Button title="Publicar" type='submit' className="h-max"/>
      </div>
    </form>
  )
}