'use client'
import { useEffect, useState } from "react";
import { format } from 'date-fns'

import { Button } from "@/components/Button";
import { WrapperItem } from "@/components/WrapperItem";

import { useToast } from "@/components/ui/use-toast";

import { deleteInfo, updateInfo } from "./action";

import { Information } from "../../page";
import { ItemSelectForm } from "@/components/ItemSelectForm";
import { ItemInputForm } from "@/components/ItemInputForm";

interface EditInfoFormProps {
  information: Information[]
}

export function EditInfoForm({ information }: EditInfoFormProps) {
  const { toast } = useToast()
  
  const formattedInformation = information.map(info => {
    return {
      label: info.name,
      value: info.id,
    }
  })

  const [selectInformation, setSelectInformation] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleUpdateInfo(data: FormData) {
    const { message } = await updateInfo(data)

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

  async function handleDeleteInfo() {
    if (selectInformation.trim() === '') {
      return
    }
    setIsDeleting(true)

    const { message } = await deleteInfo(selectInformation)

    setIsDeleting(false)
    if (message === 'Success!') {
      setName('')
      setDescription('')
      setDate('')
      
      toast({
        title: 'Informação deletada!',
        description: 'Informação deletada com sucesso!',
      })
    } else {
      toast({
        title: 'Error!',
        description: message,
        variant: 'destructive'
      })
    }
  }

  useEffect(() => {
    const info = information.find(info => info.id === selectInformation)

    if (info) {
      const formattedDate = format(new Date(info.date), 'yyyy-MM-dd')

      setName(info.name)
      setDescription(info.description)
      setDate(formattedDate)
    }
  }, [selectInformation])
  
  return (
    <form action={handleUpdateInfo} className='flex flex-col gap-6 min-w-[710px] mt-6 pl-10'>
      <ItemSelectForm
        label="Encontrar Alerta"
        data={formattedInformation}
        id="information"
        onChange={(event) => setSelectInformation(event.target.value)}
      />

      <ItemInputForm
        required
        id='title'
        type='text'
        placeholder='Digite o novo título'
        label="Alterar titulo do Alerta"
        inputValue={name}
        onChangeInput={(event) => setName(event.target.value)}
      />

      <ItemInputForm
        required
        id='date'
        type='date'
        placeholder="Selecione a nova data"
        label="Alterar data do Alerta"
        inputValue={date}
        onChangeInput={(event) => setDate(event.target.value)}
      />

      <WrapperItem htmlFor="description" label="Alterar descrição do Alerta">
        <textarea
          id='description'
          name='description'
          minLength={5}
          maxLength={460}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className='w-[520px] h-[142px] bg-white border border-[#C6C6C6] outline-none rounded-lg px-2 py-[0.375rem] text-black'
        />
      </WrapperItem>

      <div className='ml-auto flex gap-16'>
        <Button 
          type='button'
          disabled={selectInformation.trim() === '' || isDeleting}
          onClick={() => handleDeleteInfo()}
          title='Apagar Alerta'
          className="w-[173px]"
        />
        <Button
          type='submit' 
          disabled={selectInformation.trim() === ''}
          title='Editar' 
        />
      </div>
    </form>
  )
}