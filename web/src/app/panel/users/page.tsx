import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { addDays } from 'date-fns';
import { format } from 'date-fns-tz'

import { api } from '@/lib/api';

import { ListOfUsers } from '@/components/ListOfUsers';

import type { User } from '@/utils/interfaces/user';

type AxiosData = {
  users: User[]
}

export default async function UsersList() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!!)
  
  if (formattedUser.function === 'INSTRUCTOR' || formattedUser.function === 'ADMIN') {
    redirect('/panel/driving-lessons')
  }

  const { data } = await api.get<AxiosData>('/user')

  const formattedData = data?.users.map(user => {
    const formattedCreatedAt = format(new Date(user.createdAt), 'dd/MM/yyyy')

    return {
      ...user,
      createdAt: formattedCreatedAt
    }
  })

  const users = formattedData.filter(user => user.function !== 'DIRECTOR')

  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-10 mt-14 mb-16">
      <h1 className='text-xl'>Listagem dos utilizadores</h1>
      <div className='mx-auto -mt-9 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <ListOfUsers
        users={users as any}
      />
    </main>
  )
}