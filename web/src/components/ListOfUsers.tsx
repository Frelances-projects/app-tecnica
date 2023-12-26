'use client'
import { useState } from 'react'

import { SearchInput } from './SearchInput'
import { UsersTable } from './UsersTable'

import { User } from '@/utils/interfaces/user'

interface ListOfUsersProps {
  users: User[]
}

export function ListOfUsers({ users }: ListOfUsersProps) {
  const [inputValue, setInputValue] = useState<string>('')

  const filteredUsers = users?.filter((user) => {
    if (inputValue === '') return user

    const userFiltered = user?.name
      ?.toLocaleUpperCase()
      ?.startsWith(inputValue.toLocaleUpperCase())

    return userFiltered
  })

  return (
    <section className="-mt-4 w-full max-w-7xl pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">Utilizadores</h1>
      <SearchInput setInputValue={setInputValue} />

      <UsersTable users={filteredUsers} />
    </section>
  )
}
