import { addDays } from 'date-fns'
import { format } from 'date-fns-tz'

import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeleteInformationModal } from './DeleteInformationModal'
import { EditInformationModal } from './EditInformationModal'

import { Information } from '@/utils/interfaces/information'

interface InformationTableProps {
  information: Information[]
}

export function InformationTable({ information }: InformationTableProps) {
  const formattedInformationData = information.map((info) => {
    const formattedDate = format(addDays(new Date(info.date), 1), 'yyyy-MM-dd')
    const formattedTableDate = format(
      addDays(new Date(info.date), 1),
      'dd/MM/yyyy',
    )

    return {
      ...info,
      date: formattedDate,
      tableDate: formattedTableDate,
    }
  })

  return (
    <TableComponent>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Data da criação</TableHead>
          <TableHead>Escola</TableHead>
          <TableHead>Editar</TableHead>
          <TableHead>Apagar</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {formattedInformationData.map((information) => (
          <TableRow key={information.id}>
            <TableCell>{information.name}</TableCell>
            <TableCell>{information.description}</TableCell>
            <TableCell>{information.tableDate}</TableCell>
            <TableCell>{information.school.name}</TableCell>
            <TableCell>
              <EditInformationModal information={information} />
            </TableCell>
            <TableCell>
              <DeleteInformationModal
                id={information?.id}
                title={information.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableComponent>
  )
}
