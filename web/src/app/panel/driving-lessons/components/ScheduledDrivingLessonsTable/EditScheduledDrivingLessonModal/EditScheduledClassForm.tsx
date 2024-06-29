import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { InputModal } from '@/components/InputModal'
import { DatePicker } from '@/components/ui/date-picker'
import { FormField } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { Select } from '@/components/Select'

import { ScheduleClass } from '@/utils/interfaces/schedule-class'
import { editScheduledDrivingLesson } from './action'

interface EditScheduledClassFormProps {
  scheduledClass: ScheduleClass
  children: ReactNode
}

export interface EditScheduledClassInputs {
  schedulingDate?: string
  schedulingHour: string
  status:
    | 'PENDING'
    | 'UNCHECKED'
    | 'CONFIRMED'
    | 'CANCELED'
    | 'COMPLETED'
    | 'MISSED'
  vehicle: string
  instructorId: string
}

const scheduledClassStatus = [
  { value: 'PENDING', label: 'PENDENTE' },
  { value: 'UNCHECKED', label: 'DESMARCADA' },
  { value: 'CANCELED', label: 'CANCELADA' },
  { value: 'MISSED', label: 'FALTOU' },
  { value: 'CONFIRMED', label: 'CONFIRMADA' },
  { value: 'COMPLETED', label: 'COMPLETADA' },
]

export function EditScheduledClassForm({
  scheduledClass,
  children,
}: EditScheduledClassFormProps) {
  const { register, control, setValue, watch, reset, handleSubmit } =
    useForm<EditScheduledClassInputs>({
      defaultValues: {
        schedulingHour: scheduledClass.schedulingHour!,
        status: scheduledClass.status,
        vehicle: scheduledClass.vehicle,
      },
    })
  const { toast } = useToast()

  const instructors = scheduledClass.student.school.users?.filter(
    (user) => user.function === 'INSTRUCTOR',
  )

  async function handleEditScheduledClass(data: EditScheduledClassInputs) {
    const { message } = await editScheduledDrivingLesson({
      scheduledClassId: scheduledClass.id,
      classId: scheduledClass.classId,
      schedulingDateNotFormatted: scheduledClass.schedulingDateNotFormatted!,
      data,
    })

    if (message === 'Success!') {
      reset()
      toast({
        title: 'Marcação da aula de condução atualizada!',
        description:
          'A marcação da aula de condução foi atualizada com sucesso!',
      })

      location.reload()
    } else {
      toast({
        title: 'Erro!',
        description: message,
        variant: 'destructive',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleEditScheduledClass)}
      className="mb-4 mt-5 flex flex-col gap-[2.08rem]"
    >
      <Select
        id="scheduled_class_status"
        placeHolder="Selecione o Status da aula"
        data={scheduledClassStatus}
        className="w-full"
        onChange={(event) =>
          setValue(
            'status',
            event.target.value as
              | 'PENDING'
              | 'CONFIRMED'
              | 'CANCELED'
              | 'COMPLETED'
              | 'MISSED',
          )
        }
      />

      <div className="flex w-full gap-4">
        <FormField
          control={control}
          name="schedulingDate"
          render={({ field }) => (
            <DatePicker
              placeholder="Selecione a data para marcar a aula"
              field={field}
            />
          )}
        />

        <InputModal
          {...register('schedulingHour')}
          type="time"
          className="w-28 rounded-lg border border-[#C6C6C6] px-2 outline-none"
        />
      </div>

      <Select
        placeHolder="Selecione o veículo da aula"
        data={scheduledClass.student.driverLicenseCategory?.vehicles?.map(
          (vehicle) => {
            return {
              label: vehicle,
              value: vehicle,
            }
          },
        )}
        className="w-full"
        value={watch('vehicle')}
        onChange={(event) => setValue('vehicle', event.target.value)}
      />

      <Select
        placeHolder="Selecione o intrutor da aulas"
        data={instructors?.map((instructor) => {
          return {
            label: instructor.name,
            value: instructor.id,
          }
        })}
        className="w-full"
        value={watch('instructorId')}
        onChange={(event) => setValue('instructorId', event.target.value)}
      />

      {children}
    </form>
  )
}
