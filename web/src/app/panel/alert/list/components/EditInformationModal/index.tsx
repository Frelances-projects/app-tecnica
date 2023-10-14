import { Pencil } from "lucide-react"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog"

import { Information } from "@/utils/interfaces/information"
import { EditInformationForm } from "./EditInformationForm"

interface EditInformationModalProps {
  information: Information
}

export function EditInformationModal({ information }: EditInformationModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Pencil size={16} className="hover:cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full max-w-xl overflow-y-auto">
        <h1 className="font-bold text-lg">Editar alerta: {information.name}</h1>

        <EditInformationForm information={information}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              className="bg-[#E3000F] enabled:hover:bg-[#E3000F]/80 disabled:bg-[#E3000F]/60 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Editar
            </AlertDialogAction>
          </AlertDialogFooter>
        </EditInformationForm>
      </AlertDialogContent>
    </AlertDialog>
  )
}