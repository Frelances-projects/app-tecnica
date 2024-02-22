'use client'
import { SetStateAction, useState } from 'react'

import { SearchInput } from '@/components/SearchInput'
import { InformationTable } from './InformationTable'

import { Information } from '@/utils/interfaces/information'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { addDays } from 'date-fns'
import { format } from 'date-fns-tz'
import { DeleteInformationModal } from './DeleteInformationModal'
import { EditInformationModal } from './EditInformationModal'

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

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(0)

  const startIndex = currentPage * itemsPerPage
  const slicedData = filteredInformation?.slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber)
  }

  const formattedInformationData = slicedData?.map((info) => {
    const formattedDate = format(addDays(new Date(info.date), 1), 'yyyy-MM-dd')
    const formattedTableDate = format(
      addDays(new Date(info.date), 1),
      'dd/MM/yyyy',
    )

    return {
      ...info,
      date: formattedDate,
      tableDate: formattedTableDate,
    }
  })

  return (
    <section className="-mt-4 w-full max-w-7xl">
      <h1 className="mb-9 mt-6 text-lg font-medium">Listagem dos Alertas</h1>
      <SearchInput
        setInputValue={setInputValue}
        placeholder="Título do alerta"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden lg:grid-cols-3">
        {formattedInformationData?.map((info) => {
          return (
            <div
              key={info?.id}
              className="flex flex-col gap-2 rounded-lg border px-4 pt-6 transition-colors duration-200 ease-linear hover:border-[#E86255]"
            >
              <div className="ml-auto flex gap-4">
                <EditInformationModal information={info} />
                <DeleteInformationModal id={info?.id} title={info.name} />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-lg font-medium">{info?.name}</h1>
                <p className="text-[#b1b2bc]">{info?.description}</p>
                <div className="flex flex-col gap-2 border-t pb-6 pt-2 text-left">
                  <p className="flex items-center justify-between">
                    Data: <span>{info?.tableDate}</span>
                  </p>
                  <p className="flex items-center justify-between">
                    Escola: <span>{info?.school?.name}</span>
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="hidden lg:block">
        <InformationTable information={slicedData} />
      </div>

      <div className="mt-4 flex items-center justify-center gap-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white duration-200 ease-linear hover:bg-[#E86255]"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="">Página {currentPage + 1}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={startIndex + itemsPerPage >= filteredInformation?.length}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white duration-200 ease-linear hover:bg-[#E86255]"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
