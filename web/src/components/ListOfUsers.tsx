'use client'
import { useState } from "react";

import { SearchInput } from "./SearchInput";
import { UsersTable } from "./UsersTable";

import { User } from "@/utils/interfaces/user";

interface ListOfUsersProps {
  users: User[];
}

export function ListOfUsers({ users }: ListOfUsersProps) {
  const [inputValue, setInputValue] = useState<string>('')
  
  const filteredUsers = users?.filter(user => {
    if (inputValue === '') return user

    const userFiltered = user?.name?.toLocaleUpperCase()?.startsWith(inputValue.toLocaleUpperCase())

    return userFiltered
  })

  return (
    <section className="w-full max-w-7xl -mt-4 pl-10">
      <h1 className='text-lg mt-6 font-medium mb-9'>Usuários</h1>
      <SearchInput setInputValue={setInputValue} />

      <UsersTable
        users={filteredUsers}
      />
    </section>
  )
}