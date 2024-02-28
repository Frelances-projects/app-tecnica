import { AxiosError } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CheckCircle, WarningCircle, XCircle } from "@phosphor-icons/react"
import { format } from "date-fns-tz"

import { useToast } from "../ui/use-toast"
import { server } from "@/lib/server"
import { useState } from "react"

interface ChangeStatus {
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
}

interface ChangePracticalClass {
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  justification: string
}

interface PracticalClassItemProps {
  scheduledPracticalClassId: string
  date: string
  hour: string
  title: string
  status: 'PENDING' | 'UNCHECKED' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
}

export function PracticalClassItem({ scheduledPracticalClassId, title, date, hour, status }: PracticalClassItemProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const [isItShowJustificationTextArea, setIsItShowJustificationTextArea] = useState(false)
  const  [justification, setJustification] = useState('')
  
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

  const { mutateAsync: changePracticalClass, isLoading: isChangePracticalClassLoading } = useMutation(
    async ({ status, justification }: ChangePracticalClass) => {
      try {
        await server.put(`/scheduled-class/${scheduledPracticalClassId}`, {
          status,
          justification
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

  async function handleChangePracticalClass() {
    await changePracticalClass({ status: 'CANCELED', justification })

    setIsItShowJustificationTextArea(false)
    setJustification('')

    toast({
      title: "Aula de condução cancelada!",
      description: "Sua presença para a aula de condução foi cancelada!",
    })
  }
  
  return (
    <div className="w-full">
      <div className="flex gap-x-3 text-black items-center font-regular text-sm">
        <div className="flex flex-row items-center gap-x-2">
          <span>{format(new Date(date), 'dd/MM/yyyy')} {hour}</span>
        </div>

        <h1>{title}</h1>

        {
          (status === 'COMPLETED' || status === 'CONFIRMED') ? 
          <CheckCircle size={24} color="#00A300" weight="fill" /> 
          : (status === 'CANCELED' || status === 'UNCHECKED') ?
          <XCircle size={24} color="#CC0000" weight="fill" />
          : <WarningCircle size={24} color="#FDDA0D" weight="fill" />
        }
      </div>

      {status === 'PENDING' && (
        <div>
          <button 
          className="bg-primary-500 w-full mt-1 px-3 py-1 flex items-center justify-center rounded-md text-white enabled:hover:opacity-80 enabled:hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          onClick={() => justification.trim().length > 0 ? handleChangePracticalClass() : setIsItShowJustificationTextArea(!isItShowJustificationTextArea)}
          disabled={isLoading}
        >
          {justification.trim().length > 0 ? 'Enviar' : 'Não posso'}
        </button>

        <button 
          className="bg-primary-500 w-full mt-1 px-3 py-1 flex items-center justify-center rounded-md text-white enabled:hover:opacity-80 enabled:hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          onClick={() => handleChangeStatus()}
          disabled={isLoading}
          >
          Confirmar presença
          </button>
        </div>
      )}

      {isItShowJustificationTextArea && (
        <textarea 
          value={justification}
          onChange={(event) => setJustification(event.target.value)} 
          placeholder="Sugestão de outro horário"
          className="w-full placeholder-slate-500 resize-none outline-none border border-zinc-300 rounded-md px-3 pt-2 h-28 mt-4"
        />
      )}
    </div>
  )
}