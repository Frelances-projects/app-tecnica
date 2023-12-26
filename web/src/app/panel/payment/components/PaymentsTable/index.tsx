import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DeletePaymentModal } from './DeletePaymentModal'
import { EditPaymentModal } from './EditPaymentModal'

import type { Payment } from '@/utils/interfaces/payment'

interface PaymentsTableProps {
  payments: Payment[]
}

export function PaymentsTable({ payments }: PaymentsTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <TableComponent>
        <TableHeader>
          <TableRow>
            <TableHead>Aluno</TableHead>
            <TableHead>Método de pagamento</TableHead>
            <TableHead>Prestações</TableHead>
            <TableHead>Prestações pagas</TableHead>
            <TableHead>Prestações pendentes</TableHead>
            <TableHead>Escola</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Editar</TableHead>
            {/* <TableHead>Apagar</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.student.name}</TableCell>

              <TableCell>
                {payment.method === 'INSTALLMENTS'
                  ? 'PRESTAÇÕES'
                  : 'PRONTO PAGAMENTO'}
              </TableCell>

              <TableCell>
                {payment.method === 'INSTALLMENTS'
                  ? payment.amountOfInstallments
                  : 'Não possui'}
              </TableCell>

              <TableCell>
                {payment.method === 'INSTALLMENTS'
                  ? payment.amountOfInstallmentsPaid
                  : 'Não possui'}
              </TableCell>

              <TableCell>
                {payment.method === 'INSTALLMENTS'
                  ? payment.amountOfRemainingInstallments
                  : 'Não possui'}
              </TableCell>

              <TableCell>{payment.student.school.name}</TableCell>

              <TableCell>{payment.formattedTotal}</TableCell>

              {/* <TableCell>
                <DeletePaymentModal
                  id={payment.id}
                  studentName={payment.student.name}
                />
              </TableCell> */}
              <TableCell>
                <EditPaymentModal payment={payment} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableComponent>
    </div>
  )
}
