import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ListOfPayments } from './components/ListOfPayments'
import { api } from '@/lib/api'

import type { User } from '@/utils/interfaces/user'
import type { Payment } from '@/utils/interfaces/payment'

type AxiosData = {
  payments: Payment[]
}

export default async function Payment() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!) as User

  if (formattedUser.function === 'INSTRUCTOR') {
    redirect('/panel/driving-lessons')
  }

  let returnedData

  const euroFormat = new Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
  })

  if (formattedUser.function === 'DIRECTOR') {
    const { data } = await api.get<AxiosData>(`/payment`)

    const formattedData = data.payments.map((payment) => {
      return {
        ...payment,
        formattedTotal: euroFormat.format(payment.total / 100),
      }
    })

    returnedData = formattedData
  } else {
    const { data } = await api.get<AxiosData>(
      `/payment/school/${formattedUser.schoolId}`,
    )

    const formattedData = data.payments.map((payment) => {
      return {
        ...payment,
        formattedTotal: euroFormat.format(payment.total / 100),
      }
    })

    returnedData = formattedData
  }

  return (
    <main className="mb-16 mt-14 flex w-full flex-col gap-10 px-4 lg:max-w-[90vw] lg:px-0">
      <h1 className="text-xl">Gerir Pagamentos</h1>
      <div className="mx-auto -mt-9 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF]" />

      <ListOfPayments payments={returnedData} />
    </main>
  )
}
