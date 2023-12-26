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

interface UsersTableProps {
  users: User[]
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <TableComponent>
        <TableHeader>
          <TableRow>
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
