import { CalendarPlus } from 'lucide-react'

import {
  Table as TableComponent,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export function Table() {
  return (
    <div className="relative overflow-x-auto">
      <TableComponent>
        <TableCaption>Listagem de alunos</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Nome do aluno</TableHead>
            <TableHead>Número do Aluno</TableHead>
            <TableHead>Email do Aluno</TableHead>
            <TableHead>Data inscrição do Aluno</TableHead>
            <TableHead>Escola de registro do Aluno</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>Silver</TableCell>
            <TableCell>Laptop</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>$2999</TableCell>
            <TableCell>
              <CalendarPlus size={16} className="hover:cursor-pointer text-[#222222]" />
            </TableCell>
          </TableRow>
        </TableBody>
      </TableComponent>
    </div>
  )
}