'use client'
import { useState, SetStateAction } from 'react'

import { SearchInput } from '@/components/SearchInput'
import { DriverLicenseCategoriesTable } from './DriverLicenseCategoriesTable'

import { DriverLicenseCategory } from '@/utils/interfaces/driver-license-category'
import { ChevronLeft, ChevronRight, Euro } from 'lucide-react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { EditDriverLicenseCategoryModal } from './EditDriverLicenseCategoryModal'
import { DeleteDriverLicenseCategoryModal } from './DeleteDriverLicenseCategoryModal'

interface ListOfDriverLicenseCategoryProps {
  driverLicenseCategories: DriverLicenseCategory[]
}

export function ListOfDriverLicenseCategory({
  driverLicenseCategories,
}: ListOfDriverLicenseCategoryProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const filteredDriverLicenseCategories = driverLicenseCategories?.filter(
    (driverLicenseCategory) => {
      if (inputValue === '') return driverLicenseCategory

      const informationFiltered = driverLicenseCategory?.name
        ?.toLocaleUpperCase()
        ?.startsWith(inputValue.toLocaleUpperCase())

      return informationFiltered
    },
  )

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(0)

  const startIndex = currentPage * itemsPerPage
  const slicedData = filteredDriverLicenseCategories?.slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber)
  }

  return (
    <section className="-mt-4 w-full max-w-7xl lg:pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">Listagem dos preços</h1>
      <SearchInput
        setInputValue={setInputValue}
        placeholder="Filtrar por nome da categoria"
      />

      <div className="flex flex-col gap-4 md:hidden">
        {slicedData?.map((driverLicense) => {
          return (
            <Dialog key={driverLicense?.id}>
              <DialogTrigger className="flex w-full gap-3 rounded-md border px-4 py-2 hover:border-[#E86255]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E86255] text-white">
                  <Euro size={24} />
                </div>
                <div className="text-left">
                  <p className="font-medium">{driverLicense?.name}</p>
                  <p className="text-sm text-[#b1b2bc]">
                    {driverLicense?.school?.name}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-full max-w-[95vw] sm:max-w-96">
                <div className="mt-4 flex flex-col gap-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E86255] text-white">
                    <Euro size={32} />
                  </div>

                  <div className="text-center">
                    <h1 className="text-lg font-medium">
                      {driverLicense?.name}
                    </h1>
                    <p className="text-[#b1b2bc]">
                      {driverLicense?.school?.name}
                    </p>

                    <p className="mt-4 flex items-center justify-between">
                      Total: <span>{driverLicense.price}</span>
                    </p>

                    <p className="mt-4 text-left">Preço de cada parcela</p>

                    <div className="mt-4 flex flex-col text-left">
                      <div>
                        1ª {driverLicense?.installments.firstInstallment}
                      </div>
                      <div>
                        2ª {driverLicense?.installments.secondInstallment}
                      </div>

                      {driverLicense?.installments.thirdInstallment && (
                        <div>
                          3ª {driverLicense?.installments.thirdInstallment}
                        </div>
                      )}
                      {driverLicense?.installments.fourthInstallment && (
                        <div>
                          4ª {driverLicense?.installments.fourthInstallment}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex flex-col">
                      {driverLicense?.vehicles &&
                        driverLicense?.vehicles.length > 0 &&
                        driverLicense?.vehicles.map((vehicle) => (
                          <div key={vehicle}>{vehicle}</div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <EditDriverLicenseCategoryModal
                    driverLicenseCategory={driverLicense}
                    trigger
                  />
                  <DeleteDriverLicenseCategoryModal
                    id={driverLicense?.id}
                    title={driverLicense.name}
                    trigger
                  />
                </div>
              </DialogContent>
            </Dialog>
          )
        })}
      </div>

      <div className="hidden w-full md:block">
        <DriverLicenseCategoriesTable driverLicenseCategories={slicedData} />
      </div>

      {filteredDriverLicenseCategories?.length > 0 && (
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
            disabled={
              startIndex + itemsPerPage >=
              filteredDriverLicenseCategories?.length
            }
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white duration-200 ease-linear hover:bg-[#E86255]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  )
}
