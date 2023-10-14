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
  const formattedUser = JSON.parse(user!!) as User
  
  if (formattedUser.function === 'INSTRUCTOR') {
    redirect('/panel/driving-lessons')
  }

  let returnedData
  
  if (formattedUser.function === 'DIRECTOR') {
    const { data } = await api.get<AxiosData>(`/information`)

    returnedData = data.information
  } else {
    const { data } = await api.get<AxiosData>(`/information/school/${formattedUser.schoolId}`)

    returnedData = data.information
  }
  
  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-10 mt-14 mb-16">
      <h1 className='text-xl'>Gerir Alertas</h1>
      <div className='mx-auto -mt-9 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <ListOfInformation information={returnedData} />
    </main>
  )
}