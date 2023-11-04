import { Pencil } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { EditDrivingExamForm } from "./EditDrivingExamForm"

import { Test } from "@/utils/interfaces/tests"

interface EditDrivingExamModalProps {
  test: Test
}

export function EditDrivingExamModal({ test }: EditDrivingExamModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Pencil size={16} className="hover:cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-xl overflow-y-auto">
        <h1 className="font-bold text-lg">
          Editar exame de código do aluno: {test.student.name}
        </h1>

        <EditDrivingExamForm
          test={test}
        >
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              className="bg-[#E3000F] enabled:hover:bg-[#E3000F]/80 disabled:bg-[#E3000F]/60 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Editar
            </AlertDialogAction>
          </AlertDialogFooter>
        </EditDrivingExamForm>
      </AlertDialogContent>
    </AlertDialog>
  )
}