import { Button } from "@/components/Button";
import { SelectComponent } from "@/components/Select";

import PdfIcon from '../../../assets/PDF-Icon.svg'
import Image from "next/image";

export default function CreateCodeCalendar() {
  return (
    <form className="flex flex-col gap-[2.08rem] mr-auto mt-24 mb-16">
      <fieldset className='flex items-center gap-14'>
        <label htmlFor="information-name" className='text-xs'>Nome da Categoria</label>
        <SelectComponent placeHolder='Mes X' data={[]}/>
      </fieldset>
      <div className="flex justify-between items-end">
        <div className="flex bg-[#F3F3F3] border border-dashed border-red-500 gap-8 items-center px-3 py-3 w-56 rounded">
          <Image src={PdfIcon} alt='PDF File' />
          <p className="text-black text-xs font-bold underline">File Browse</p>
        </div>
        <Button title="Publicar" type='submit' className="h-max"/>
      </div>
    </form>
  )
}