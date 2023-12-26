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

  if (formattedUser.function === 'DIRECTOR') {
    const { data } = await api.get<AxiosData>(`/payment`)

    returnedData = data.payments
  } else {
    const { data } = await api.get<AxiosData>(
      `/payment/school/${formattedUser.schoolId}`,
    )

    returnedData = data.payments
  }

  return (
    <main className="mb-16 mt-14 flex w-full max-w-[80vw] flex-col gap-10">
      <h1 className="text-xl">Gerir Pagamentos</h1>
      <div className="mx-auto -mt-9 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF]" />

      <ListOfPayments payments={returnedData} />
    </main>
  )
}
