'use client'
import { useState } from 'react'

import { SearchInput } from '@/components/SearchInput'
import { DriverLicenseCategoriesTable } from './DriverLicenseCategoriesTable'

import { DriverLicenseCategory } from '@/utils/interfaces/driver-license-category'

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

  return (
    <section className="-mt-4 w-full max-w-7xl pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">Listagem dos preços</h1>
      <SearchInput
        setInputValue={setInputValue}
        placeholder="Filtrar por nome da categoria"
      />

      <DriverLicenseCategoriesTable
        driverLicenseCategories={filteredDriverLicenseCategories}
      />
    </section>
  )
}
