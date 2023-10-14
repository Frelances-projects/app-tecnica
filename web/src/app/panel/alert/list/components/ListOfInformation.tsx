'use client'
import { useState } from "react"

import { SearchInput } from "@/components/SearchInput"
import { InformationTable } from "./InformationTable"

import { Information } from "@/utils/interfaces/information"

interface ListOfInformationProps {
  information: Information[]
}

export function ListOfInformation({ information }: ListOfInformationProps) {
  const [inputValue, setInputValue] = useState<string>('')
  
  const filteredInformation = information?.filter(information => {
    if (inputValue === '') return information

    const informationFiltered = information?.name?.toLocaleUpperCase()?.startsWith(inputValue.toLocaleUpperCase())

    return informationFiltered
  })
  
  return (
    <section className="w-full max-w-7xl -mt-4 pl-10">
      <h1 className='text-lg mt-6 font-medium mb-9'>Listagem dos Alertas</h1>
      <SearchInput setInputValue={setInputValue} placeholder="Título do alerta" />

      <InformationTable information={filteredInformation} />
    </section>
  )
}