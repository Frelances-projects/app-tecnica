/* eslint-disable @typescript-eslint/no-explicit-any */
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { format } from 'date-fns-tz'

import { api } from '@/lib/api'

import { ListOfUsers } from '@/components/ListOfUsers'

import type { User } from '@/utils/interfaces/user'

type AxiosData = {
  users: User[]
}

export default async function UsersList() {
  const user = cookies().get('user')?.value
  const formattedUser = JSON.parse(user!)

  if (
    formattedUser.function === 'INSTRUCTOR' ||
    formattedUser.function === 'ADMIN'
  ) {
    redirect('/panel/driving-lessons')
  }

  const { data } = await api.get<AxiosData>('/user')

  const formattedData = data?.users.map((user) => {
    const formattedCreatedAt = format(new Date(user.createdAt), 'dd/MM/yyyy')

    return {
      ...user,
      createdAt: formattedCreatedAt,
    }
  })

  const users = formattedData.filter((user) => user.function !== 'DIRECTOR')

  return (
    <main className="mb-16 mt-14 flex w-full flex-col gap-10 px-4 lg:max-w-[90vw] lg:px-0">
      <h1 className="text-xl">Listagem dos utilizadores</h1>
      <div className="mx-auto -mt-9 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF]" />

      <ListOfUsers users={users as unknown as any} />
    </main>
  )
}
