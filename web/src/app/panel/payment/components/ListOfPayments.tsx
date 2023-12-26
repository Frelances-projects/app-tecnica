'use client'
import { useState } from 'react'

import { SearchInput } from '@/components/SearchInput'
import { PaymentsTable } from './PaymentsTable'

import { Payment } from '@/utils/interfaces/payment'

interface ListOfPaymentsProps {
  payments: Payment[]
}

export function ListOfPayments({ payments }: ListOfPaymentsProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const filteredPayments = payments?.filter((payment) => {
    if (inputValue === '') return payment

    const paymentFiltered = payment?.student?.name
      ?.toLocaleUpperCase()
      ?.startsWith(inputValue.toLocaleUpperCase())

    return paymentFiltered
  })

  return (
    <section className="-mt-4 w-full max-w-7xl pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">Listagem dos Pagamentos</h1>
      <SearchInput
        setInputValue={setInputValue}
        placeholder="Filtrar por nome do aluno"
      />

      <PaymentsTable payments={filteredPayments} />
    </section>
  )
}
