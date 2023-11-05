import { AxiosError } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CheckCircle, WarningCircle, XCircle } from "@phosphor-icons/react"
import { format } from "date-fns-tz"

import { useToast } from "../ui/use-toast"
import { server } from "@/lib/server"

interface ChangeStatus {
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
}

interface PracticalClassItemProps {
  scheduledPracticalClassId: string
  date: string
  hour: string
  title: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
}

export function PracticalClassItem({ scheduledPracticalClassId, title, date, hour, status }: PracticalClassItemProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  
  const { mutateAsync: changeStatus, isLoading } = useMutation(
    async ({ status }: ChangeStatus) => {
      try {
        await server.put(`/scheduled-class/${scheduledPracticalClassId}/status`, {
          status,
        })
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            title: "Ops! Erro no servidor",
            description: "Tente novamente mais tarde",
            variant: 'destructive'
          })
        }
      }
    },
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ['practical-classes'] })
      },
    },
  )

  async function handleChangeStatus() {
    await changeStatus({ status: 'CONFIRMED' })

    toast({
      title: "Aula de condução confirmada!",
      description: "Sua presença para a aula de condução foi confirmada com sucesso!",
    })
  }
  
  return (
    <div className="flex mb-8 flex-col gap-x-5 text-black items-center font-regular text-sm">
      <div className="flex flex-row items-center gap-x-2">
        <span>{format(new Date(date), 'dd/MM/yyyy')} {hour}</span>
        {
          (status === 'COMPLETED' || status === 'CONFIRMED') ? 
          <CheckCircle size={24} color="#00A300" weight="fill" /> 
          : status === 'CANCELED' ?
          <XCircle size={24} color="#CC0000" weight="fill" />
          : <WarningCircle size={24} color="#FDDA0D" weight="fill" />
        }
      </div>
      <h1>{title}</h1>

      {status === 'PENDING' && (
        <button 
          className="bg-primary-500 mt-1 px-3 py-1 flex items-center rounded-sm text-white enabled:hover:opacity-80 enabled:hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          onClick={() => handleChangeStatus()}
          disabled={isLoading}
        >
          Confirmar presença
        </button>
      )}
    </div>
  )
}