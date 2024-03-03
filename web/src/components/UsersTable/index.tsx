/* eslint-disable @typescript-eslint/no-explicit-any */
import { Copy } from 'lucide-react'

import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteUserModal } from './DeleteUserModal'

import { User } from '@/utils/interfaces/user'
import { useToast } from '../ui/use-toast'

interface UsersTableProps {
  users: User[]
}

export function UsersTable({ users }: UsersTableProps) {
  const { toast } = useToast()

  function handleCopyUserId(id: string) {
    navigator.clipboard.writeText(id)

    toast({
      title: 'ID copiado com sucesso!',
      description: 'ID copiado para a área de transferência com sucesso',
    })
  }

  return (
    <div className="relative overflow-x-auto">
      <TableComponent>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Data inscrição</TableHead>
            <TableHead>Escola</TableHead>
            <TableHead>Apagar</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell onClick={() => handleCopyUserId(user?.imtId ?? '')}>
                  <Copy
                    size={20}
                    className="hover:cursor-pointer hover:text-green-600"
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {user.function === 'ADMIN' ? 'ADMINISTRADOR' : 'INSTRUTOR'}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.createdAt as any}</TableCell>
                <TableCell>{user?.school?.name}</TableCell>
                <TableCell>
                  <DeleteUserModal user={user} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </TableComponent>
    </div>
  )
}
