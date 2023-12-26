'use client'
import { useState } from 'react'

import { SearchInput } from '@/components/SearchInput'
import { InformationTable } from './InformationTable'

import { Information } from '@/utils/interfaces/information'

interface ListOfInformationProps {
  information: Information[]
}

export function ListOfInformation({ information }: ListOfInformationProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const filteredInformation = information?.filter((information) => {
    if (inputValue === '') return information

    const informationFiltered = information?.name
      ?.toLocaleUpperCase()
      ?.startsWith(inputValue.toLocaleUpperCase())

    return informationFiltered
  })

  return (
    <section className="-mt-4 w-full max-w-7xl pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">Listagem dos Alertas</h1>
      <SearchInput
        setInputValue={setInputValue}
        placeholder="Título do alerta"
      />

      <InformationTable information={filteredInformation} />
    </section>
  )
}
