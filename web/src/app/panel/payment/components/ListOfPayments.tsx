'use client'
import { useState, SetStateAction } from 'react'

import { SearchInput } from '@/components/SearchInput'
import { PaymentsTable } from './PaymentsTable'

import { Payment } from '@/utils/interfaces/payment'
import { ChevronLeft, ChevronRight, User2 } from 'lucide-react'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { EditPaymentModal } from './PaymentsTable/EditPaymentModal'

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

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(0)

  const startIndex = currentPage * itemsPerPage
  const slicedData = filteredPaymentsByStudentNumber?.slice(
    startIndex,
    startIndex + itemsPerPage,
  )

  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber)
  }

  return (
    <section className="-mt-4 w-full max-w-7xl lg:pl-10">
      <h1 className="mb-4 mt-6 text-lg font-medium md:mb-9">
        Listagem dos Pagamentos
      </h1>
      <div className="flex max-w-96 flex-col gap-4 sm:flex-row">
        <SearchInput setInputValue={setInputValueName} />
        <div className="-mt-11 sm:-mt-0">
          <SearchInput
            placeholder="Pesquisar pelo número do aluno"
            setInputValue={setInputValueCode}
            type="number"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:hidden lg:hidden">
        {slicedData?.map((payment) => {
          return (
            <Dialog key={payment?.id}>
              <DialogTrigger className="flex w-full gap-3 rounded-md border px-4 py-2 hover:border-[#E86255]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E86255] text-white">
                  <User2 size={24} />
                </div>
                <div className="w-[80%] text-left">
                  <p className="w-[85%]  truncate font-medium">
                    {payment?.student?.name}
                  </p>
                  <p className="w-[85%] truncate text-sm text-[#b1b2bc]">
                    {payment?.student?.school?.name}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-full max-w-[95vw] sm:max-w-96">
                <div className="mt-4 flex flex-col gap-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E86255] text-white">
                    <User2 size={32} />
                  </div>
                  <div className="text-center">
                    <h1 className="text-lg font-medium">
                      {payment?.student?.name}
                    </h1>
                    <p className="text-[#b1b2bc]">
                      {payment?.student?.school?.name}
                    </p>

                    <div className="mt-4 flex flex-col gap-2 border-y py-2 text-left">
                      <p className="flex items-center justify-between">
                        Método de pagamento:{' '}
                        <span>
                          {payment.method === 'INSTALLMENTS'
                            ? 'Prestações'
                            : 'Pronto Pagamento'}
                        </span>
                      </p>

                      <p className="flex items-center justify-between">
                        Prestações:{' '}
                        <span>
                          {payment.method === 'INSTALLMENTS'
                            ? payment.amountOfInstallments
                            : 'Não possui'}
                        </span>
                      </p>
                      <p className="flex items-center justify-between">
                        Prestações pagas:{' '}
                        <span>
                          {payment.method === 'INSTALLMENTS'
                            ? payment?.amountOfInstallmentsPaid
                            : 'Não possui'}
                        </span>
                      </p>
                      <p className="flex items-center justify-between">
                        Prestações pendentes:{' '}
                        <span>
                          {payment.method === 'INSTALLMENTS'
                            ? payment?.amountOfRemainingInstallments
                            : 'Não possui'}
                        </span>
                      </p>

                      <p className="flex items-center justify-between">
                        Total: <span>{payment?.formattedTotal}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <EditPaymentModal payment={payment} trigger />
              </DialogContent>
            </Dialog>
          )
        })}
      </div>

      <div className="hidden w-full md:block">
        <PaymentsTable payments={slicedData} />
      </div>

      {filteredPaymentsByStudentNumber?.length > 0 && (
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
              filteredPaymentsByStudentNumber?.length
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
