'use client'

import { useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { InputModal } from '@/components/InputModal'
import { Select } from '@/components/Select'
import { useToast } from '@/components/ui/use-toast'
import { EuroInput } from '@/app/panel/prices/register/components/CreatePricesSection/EuroInput'

import type { Payment } from '@/utils/interfaces/payment'
import { editPayment } from './action'

const paymentMethod = [
  { value: 'INCASH', label: 'Pronto Pagamento' },
  { value: 'INSTALLMENTS', label: 'Prestações' },
]

interface EditPaymentFormProps {
  payment: Payment
  children: ReactNode
}

export interface EditPaymentInputs {
  paymentMethod: 'INSTALLMENTS' | 'INCASH'
  amountOfInstallments?: number
  amountOfInstallmentsPaid?: number
}

export function EditPaymentForm({ payment, children }: EditPaymentFormProps) {
  const [totalValue, setTotalValue] = useState(
    (payment.total / 100).toString().replaceAll(',', ''),
  )

  const { register, setValue, reset, watch, handleSubmit } =
    useForm<EditPaymentInputs>({
      defaultValues: {
        paymentMethod: payment.method,
        amountOfInstallments:
          payment.method === 'INSTALLMENTS'
            ? payment.amountOfInstallments
            : undefined,
        amountOfInstallmentsPaid:
          payment.method === 'INSTALLMENTS'
            ? payment.amountOfInstallmentsPaid
            : undefined,
      },
    })
  const method = watch('paymentMethod')
  const { toast } = useToast()

  async function handleEditPayment(data: EditPaymentInputs) {
    if (
      method === 'INSTALLMENTS' &&
      data.amountOfInstallments &&
      data.amountOfInstallmentsPaid &&
      Number(data.amountOfInstallments) < Number(data.amountOfInstallmentsPaid)
    ) {
      return toast({
        title: 'Números de prestações incorretos',
        description:
          'O Número de prestações pagas não pode ser maior que o total das prestações a pagar',
        variant: 'destructive',
      })
    }

    const { message } = await editPayment(data, payment, totalValue)

    if (message === 'Success!') {
      reset()
      toast({
        title: 'Pagamento editado!',
        description: 'Pagamento editado com sucesso!',
      })
    } else {
      toast({
        title: 'Erro!',
        description: message,
        variant: 'destructive',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleEditPayment)}
      className="mb-4 mt-5 flex flex-col gap-[2.08rem]"
    >
      <Select
        id="payment_method"
        placeHolder="Selecione método de pagamento"
        defaultValue={method}
        data={paymentMethod}
        className="w-full"
        onChange={(event) =>
          setValue(
            'paymentMethod',
            event.target.value as 'INSTALLMENTS' | 'INCASH',
          )
        }
      />

      <EuroInput
        formattedValue={totalValue}
        setFormattedValue={setTotalValue}
      />

      {method === 'INSTALLMENTS' && (
        <>
          <InputModal
            {...register('amountOfInstallments')}
            type="number"
            required={method === 'INSTALLMENTS'}
            placeholder="Total de prestações"
            className="rounded-lg border border-[#C6C6C6] px-2 py-[0.375rem] outline-none"
          />

          <InputModal
            {...register('amountOfInstallmentsPaid')}
            type="number"
            required={method === 'INSTALLMENTS'}
            placeholder="Prestações pagas"
            className="rounded-lg border border-[#C6C6C6] px-2 py-[0.375rem] outline-none"
          />
        </>
      )}

      {children}
    </form>
  )
}
