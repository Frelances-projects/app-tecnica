'use client'
import { useState } from 'react'

import { SearchInput } from '@/components/SearchInput'
import { PaymentsTable } from './PaymentsTable'

import { Payment } from '@/utils/interfaces/payment'

interface ListOfPaymentsProps {
  payments: Payment[]
}

export function ListOfPayments({ payments }: ListOfPaymentsProps) {
  const [inputValueName, setInputValueName] = useState<string>('')
  const [inputValueCode, setInputValueCode] = useState<string>('')

  const filteredPayments = payments?.filter((payment) => {
    if (inputValueName === '') return payment

    const paymentFiltered = payment?.student?.name
      ?.toLocaleUpperCase()
      ?.startsWith(inputValueName.toLocaleUpperCase())

    return paymentFiltered
  })

  const filteredPaymentsByStudentNumber = filteredPayments.filter((payment) => {
    if (inputValueCode === '') return filteredPayments

    const studentFiltered = String(payment.student?.number)
      ?.toLocaleUpperCase()
      ?.startsWith(inputValueCode.toLocaleUpperCase())

    return studentFiltered
  })

  return (
    <section className="-mt-4 w-full max-w-7xl pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">Listagem dos Pagamentos</h1>
      <div className="flex">
        <SearchInput setInputValue={setInputValueName} />
        <SearchInput
          placeholder="Pesquisar pelo número do aluno"
          setInputValue={setInputValueCode}
          type="number"
        />
      </div>

      <PaymentsTable payments={filteredPaymentsByStudentNumber} />
    </section>
  )
}
