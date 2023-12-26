import { Pencil } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { EditPaymentForm } from './EditPaymentForm'

import { Payment } from '@/utils/interfaces/payment'

interface EditPaymentModalProps {
  payment: Payment
}

export function EditPaymentModal({ payment }: EditPaymentModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Pencil size={16} className="hover:cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-xl overflow-y-auto">
        <h1 className="text-lg font-bold">
          Editar pagamento do(a) aluno(a): {payment.student.name}
        </h1>

        <EditPaymentForm payment={payment}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              className="bg-[#E3000F] transition-colors duration-300 enabled:hover:bg-[#E3000F]/80 disabled:cursor-not-allowed disabled:bg-[#E3000F]/60"
            >
              Editar
            </AlertDialogAction>
          </AlertDialogFooter>
        </EditPaymentForm>
      </AlertDialogContent>
    </AlertDialog>
  )
}
