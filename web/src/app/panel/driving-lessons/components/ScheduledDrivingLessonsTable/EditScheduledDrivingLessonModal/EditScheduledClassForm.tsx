import { ReactNode } from "react"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"

import { InputModal } from "@/components/InputModal"
import { DatePicker } from "@/components/ui/date-picker"
import { FormField } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Select } from "@/components/Select"

import { api } from "@/lib/api"
import { errorMessages } from "@/utils/errors/errorMessages"
import { ScheduleClass } from "@/utils/interfaces/schedule-class"
import { format } from "date-fns"

interface EditScheduledClassFormProps {
  scheduledClass: ScheduleClass
  children: ReactNode
}

interface EditScheduledClassInputs {
  schedulingDate?: string
  schedulingHour: string
  status: 'PENDING' | 'UNCHECKED' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
}

const scheduledClassStatus = [
  { value: "PENDING", label: "PENDENTE" },
  { value: "UNCHECKED", label: "DESMARCADA" },
  { value: "CANCELED", label: "CANCELADA" },
  { value: "CONFIRMED", label: "CONFIRMADA" },
  { value: "COMPLETED", label: "COMPLETADA" },
]

export function EditScheduledClassForm({ scheduledClass, children }: EditScheduledClassFormProps) {
  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit,
  } = useForm<EditScheduledClassInputs>({ defaultValues: 
    {
      schedulingHour: scheduledClass.schedulingHour!,
      status: scheduledClass.status,
    }
  })
  const { toast } = useToast()
  
  async function handleEditScheduledClass(data: EditScheduledClassInputs) {
    try {
      await api.put(`/scheduled-class/${scheduledClass.id}`,
        {
          schedulingDate: data.schedulingDate 
            ? new Date(data.schedulingDate).toISOString()
            : new Date(scheduledClass.schedulingDateNotFormatted!).toISOString(),
          schedulingHour: data.schedulingHour,
          status: data.status,
          classId: scheduledClass.classId
        }
      )

      reset()
      toast({
        title: 'Marcação da aula de condução atualizada!',
        description: 'A marcação da aula de condução foi atualizada com sucesso!'
      })
      location.reload()
    } catch (error) {
      console.log("🚀 ~ file: EditScheduledClassForm.tsx:62 ~ handleEditScheduledClass ~ error:", error)
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          if (error.response?.data.message === errorMessages.scheduledClassNotFound) {
            return toast({
              title: 'Marcação da aula de condução não encontrado!',
              description: 'Parece que essa marcação já foi deletada!',
              variant: 'destructive'
            })
          }
        } else {
          return toast({
            title: 'Erro!',
            description: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
            variant: 'destructive'
          })
        }
      }
    }
  }

  return (
    <form 
      onSubmit={handleSubmit(handleEditScheduledClass)}
      className="flex flex-col gap-[2.08rem] mt-5 mb-4"
    >
      <Select
        id="scheduled_class_status"
        placeHolder="Selecione o Status da aula"
        data={scheduledClassStatus}
        className="w-full"
        onChange={
          (event) => setValue('status', event.target.value as "PENDING" | "CONFIRMED" | "CANCELED" | "COMPLETED")
        }
      />

      <div className="flex gap-4 w-full">
        <FormField control={control} name="schedulingDate" render={({ field }) => 
          (
            <DatePicker
              placeholder="Selecione a data para marcar a aula"
              field={field}
            />
          )}
        />

        <InputModal
          {...register('schedulingHour')}
          type="time"
          className="w-28 border border-[#C6C6C6] rounded-lg px-2 outline-none"
        />
      </div>

      {children}
    </form>
  )
}