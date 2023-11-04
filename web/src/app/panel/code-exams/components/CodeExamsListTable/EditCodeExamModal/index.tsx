import { Pencil } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { EditCodeExamForm } from "./EditCodeExamForm"

import { Test } from "@/utils/interfaces/tests"

interface EditCodeExamModalProps {
  test: Test
}

export function EditCodeExamModal({ test }: EditCodeExamModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Pencil size={16} className="hover:cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-xl overflow-y-auto">
        <h1 className="font-bold text-lg">
          Editar exame de código do aluno: {test.student.name}
        </h1>

        <EditCodeExamForm
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
        </EditCodeExamForm>
      </AlertDialogContent>
    </AlertDialog>
  )
}