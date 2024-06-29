import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { X } from 'lucide-react'
import { format } from 'date-fns-tz'

import { InputModal } from '@/components/InputModal'
import { DatePicker } from '@/components/ui/date-picker'
import { FormField } from '@/components/ui/form'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/Button'
import { buttonVariants } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Combobox } from '@/components/ui/Combobox'

import { cn } from '@/lib/utils'
import { createScheduledDrivingLesson } from './actions'
import { Select } from '@/components/Select'

import type { User } from '@/utils/interfaces/user'

interface Lesson {
  lessonName: string
  lessonDescription?: string
  schedulingDate: string
  schedulingHour: string
  studentId: string
  vehicle: string
  instructorId: string
}

export interface CreateScheduledDrivingLessonInputs {
  lessonName: string
  lessonDescription?: string
  schedulingDate: string | undefined
  schedulingHour: string
  studentId: string
  vehicle: string
  instructorId: string
  lessons: Lesson[]
}

interface CreateScheduledDrivingLessonFormProps {
  students: {
    value: string
    label: string
    number?: string
    vehicles?: string[]
    school?: {
      id: string
      name: string
      users?: User[]
    }
  }[]
  setIsModalOpen: (isOpen: boolean) => void
}

export function CreateScheduledDrivingLessonForm({
  students,
  setIsModalOpen,
}: CreateScheduledDrivingLessonFormProps) {
  const {
    register,
    watch,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateScheduledDrivingLessonInputs>({
    defaultValues: {
      lessonName: undefined,
      lessonDescription: undefined,
      lessons: [],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lessons',
  })
  const lessonName = watch('lessonName')
  const lessonDescription = watch('lessonDescription')
  const lessonDate = watch('schedulingDate')
  const lessonHour = watch('schedulingHour')
  const studentId = watch('studentId')
  const vehicle = watch('vehicle')
  const instructorId = watch('instructorId')
  const disabledButton =
    lessonName?.trim() === '' ||
    !lessonDate ||
    lessonHour?.trim() === '' ||
    studentId?.trim() === ''
  const { toast } = useToast()

  const [vehicles, setVehicles] = useState<string[]>([])
  const [instructors, setInstructors] = useState<
    { label: string; value: string }[]
  >([])

  function handleAddLessonIntoArray(lesson: Lesson) {
    append(lesson)

    setValue('lessonName', '')
    setValue('lessonDescription', '')
    setValue('schedulingDate', undefined)
    setValue('schedulingHour', '')
  }

  function handleCloseModal() {
    reset()
    setIsModalOpen(false)
  }

  async function handleCreateScheduledDrivingLessonForm(
    data: CreateScheduledDrivingLessonInputs,
  ) {
    const { message } = await createScheduledDrivingLesson(data)

    if (message === 'Success!') {
      reset()
      setIsModalOpen(false)
      toast({
        title:
          data.lessons.length > 1
            ? 'Aulas marcadas com sucesso!'
            : 'Aula marcada com sucesso!',
        description:
          data.lessons.length > 1
            ? 'As aulas foram marcadas com sucesso!'
            : 'A aula foi marcada com sucesso!',
      })

      location.reload()
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro!',
        description: message,
      })
    }
  }

  useEffect(() => {
    const student = students.find((student) => student.value === studentId)

    setVehicles(student?.vehicles ?? [])

    const instructors = student?.school?.users?.filter(
      (user) => user.function === 'INSTRUCTOR',
    )

    setInstructors(
      instructors?.map((user) => {
        return { label: user.name, value: user.id }
      }) ?? [],
    )
  }, [studentId, students])

  return (
    <form
      onSubmit={handleSubmit(handleCreateScheduledDrivingLessonForm)}
      className="mb-4 mt-5 flex flex-col gap-[2.08rem]"
    >
      <InputModal
        placeholder="Insira o título da aula"
        type="text"
        required={fields.length === 0}
        {...register('lessonName')}
      />

      {/* <textarea
        {...register('lessonDescription')}
        minLength={5}
        maxLength={460}
        placeholder="Insira a descrição da aula(Opcional)"
        className="h-[142px] w-full max-w-[520px] resize-none rounded-lg border border-[#C6C6C6] bg-white px-2 py-[0.375rem] text-black outline-none"
      /> */}

      <fieldset>
        <label htmlFor="fileInput" className="text-sm">
          Selecione o estudante para marcar a aula
        </label>

        <Combobox
          data={students}
          onSelect={(value) => setValue('studentId', value)}
          placeholder="Selecione um estudante"
          inputPlaceholder="Digite o número do estudante"
          emptyHeading="Estudante não encontrado."
        />
      </fieldset>

      <div className="flex w-full gap-4">
        <FormField
          control={control}
          rules={{ required: fields.length === 0 }}
          name="schedulingDate"
          render={({ field }) => (
            <DatePicker placeholder="Selecione uma data" field={field} />
          )}
        />

        <InputModal
          {...register('schedulingHour')}
          required={fields.length === 0}
          type="time"
          className="w-24 rounded-lg border border-[#C6C6C6] px-2 outline-none"
        />
      </div>

      <Select
        disabled={vehicles.length === 0}
        placeHolder="Selecione o veículo da aula"
        data={vehicles.map((vehicle) => {
          return {
            label: vehicle,
            value: vehicle,
          }
        })}
        className="w-full lg:w-full"
        onChange={(event) => setValue('vehicle', event.target.value)}
      />

      <Select
        disabled={instructors.length === 0}
        placeHolder="Selecione o instrutor"
        data={instructors}
        className="w-full lg:w-full"
        onChange={(event) => setValue('instructorId', event.target.value)}
      />
      {fields && fields?.length > 0 && (
        <ScrollArea className="h-24">
          <div className="flex w-full flex-col items-start gap-y-2">
            {fields.map((lesson, index) => {
              const formattedLessonDate = format(
                new Date(lesson.schedulingDate),
                'dd/MM/yyyy',
              )

              return (
                <span
                  key={lesson.id}
                  className="flex items-center justify-center truncate rounded-sm bg-slate-100 px-2 py-1 font-medium text-slate-900"
                >
                  {lesson.lessonName} - {formattedLessonDate}
                  <button
                    onClick={() => remove(index)}
                    className="ml-1 rounded-full border border-slate-300 p-1"
                  >
                    <X size={14} color="black" />
                  </button>
                </span>
              )
            })}
          </div>

          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )}

      <DialogFooter>
        <button
          className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0')}
          onClick={() => handleCloseModal()}
        >
          Cancelar
        </button>

        <button
          className={cn(
            buttonVariants({ variant: 'secondary' }),
            'mt-2 bg-orange-500 text-white enabled:hover:bg-orange-400 sm:mt-0',
          )}
          type="button"
          disabled={disabledButton}
          onClick={() =>
            handleAddLessonIntoArray({
              lessonName,
              lessonDescription,
              studentId,
              schedulingDate: new Date(lessonDate!).toISOString(),
              schedulingHour: lessonHour,
              vehicle,
              instructorId,
            })
          }
        >
          Adicionar aula
        </button>

        {fields.length > 0 && (
          <Button
            type="submit"
            title={fields.length === 1 ? 'Marcar aula' : 'Marcar aulas'}
            disabled={isSubmitting}
            className="mt-[2px] !h-[2.125rem] !w-40"
          />
        )}
      </DialogFooter>
    </form>
  )
}
