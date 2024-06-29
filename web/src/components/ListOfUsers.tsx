/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, SetStateAction } from 'react'
import { ChevronLeft, ChevronRight, User2, Copy } from 'lucide-react'

import { SearchInput } from './SearchInput'
import { UsersTable } from './UsersTable'

import { User } from '@/utils/interfaces/user'
import { useToast } from './ui/use-toast'

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { DeleteUserModal } from './UsersTable/DeleteUserModal'

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

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(0)

  const startIndex = currentPage * itemsPerPage
  const slicedData = filteredUsers?.slice(startIndex, startIndex + itemsPerPage)

  function handlePageChange(pageNumber: SetStateAction<number>) {
    setCurrentPage(pageNumber)
  }

  const { toast } = useToast()

  function handleCopyUserId(id: string) {
    navigator.clipboard.writeText(id)

    toast({
      title: 'ID copiado com sucesso!',
      description: 'ID copiado para a área de transferência com sucesso',
    })
  }

  return (
    <section className="-mt-4 w-full lg:max-w-7xl lg:pl-10">
      <h1 className="mb-9 mt-6 text-lg font-medium">Utilizadores</h1>
      <SearchInput setInputValue={setInputValue} />

      <div className="flex flex-col gap-4 md:hidden">
        {slicedData?.map((user) => {
          return (
            <Dialog key={user?.id}>
              <DialogTrigger className="flex w-full gap-3 rounded-md border px-4 py-2 hover:border-[#E86255]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E86255] text-white">
                  <User2 size={24} />
                </div>

                <div className="w-[80%] text-left">
                  <p className="w-[85%] truncate font-medium">{user?.name}</p>
                  <p className="w-[85%] truncate text-sm text-[#b1b2bc]">
                    {user?.email}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="w-full max-w-[95vw] sm:max-w-96">
                <div className="mt-4 flex flex-col gap-4">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E86255] text-white">
                    <User2 size={32} />
                  </div>
                  <div className="text-center">
                    <h1 className="text-lg font-medium">{user?.name}</h1>
                    <p className="text-[#b1b2bc]">{user?.email}</p>

                    <div className="mt-4 flex flex-col gap-2 border-y py-2 text-left">
                      <p className="flex items-center justify-between">
                        Data: <span>{user?.createdAt as unknown as any}</span>
                      </p>

                      <p className="flex items-center justify-between">
                        Escola: <span>{user?.school?.name}</span>
                      </p>

                      <p className="flex items-center justify-between">
                        Função:{' '}
                        <span>
                          {user.function === 'ADMIN'
                            ? 'ADMINISTRADOR'
                            : 'INSTRUTOR'}
                        </span>
                      </p>

                      <p className="flex items-center justify-between">
                        ID
                        <button
                          onClick={() => handleCopyUserId(user?.imtId ?? '')}
                        >
                          <Copy
                            size={20}
                            className="hover:cursor-pointer hover:text-green-600"
                          />
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <DeleteUserModal trigger user={user} />
              </DialogContent>
            </Dialog>
          )
        })}
      </div>

      <div className="hidden w-full md:block">
        <UsersTable users={slicedData} />
      </div>

      {filteredUsers?.length > 0 && (
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
            disabled={startIndex + itemsPerPage >= filteredUsers?.length}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-white duration-200 ease-linear hover:bg-[#E86255]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  )
}
