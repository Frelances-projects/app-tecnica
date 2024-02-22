import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ListOfInformation } from './components/ListOfInformation'

import { api } from '@/lib/api'

import { User } from '@/utils/interfaces/user'
import { Information } from '@/utils/interfaces/information'

type AxiosData = {
  information: Information[]
}

export default async function ManageAlerts() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!) as User

  if (formattedUser.function === 'INSTRUCTOR') {
    redirect('/panel/driving-lessons')
  }

  let returnedData

  if (formattedUser.function === 'DIRECTOR') {
    const { data } = await api.get<AxiosData>(`/information`)

    returnedData = data.information
  } else {
    const { data } = await api.get<AxiosData>(
      `/information/school/${formattedUser.schoolId}`,
    )

    returnedData = data.information
  }

  return (
    <main className="mb-16 mt-14 flex w-full flex-col gap-10 px-4 md:max-w-[80vw] lg:px-0">
      <h1 className="text-xl">Gerir Alertas</h1>
      <div className="-mt-9 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF]" />

      <ListOfInformation information={returnedData} />
    </main>
  )
}
