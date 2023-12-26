import { useForm, useFieldArray } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { X } from 'lucide-react'

import { InputModal } from '@/components/InputModal'
import { Select } from '@/components/Select'
import { DatePicker } from '@/components/ui/date-picker'
import { FormField } from '@/components/ui/form'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/Button'
import { buttonVariants } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { cn } from '@/lib/utils'
import { api } from '@/lib/api'
import { format } from 'date-fns-tz'

interface Lesson {
  lessonName: string
  lessonDescription?: string
  schedulingDate: string
  schedulingHour: string
  studentId: string
}

interface CreateScheduledDrivingLessonInputs {
  lessonName: string
  lessonDescription?: string
  schedulingDate: string | undefined
  schedulingHour: string
  studentId: string
  lessons: Lesson[]
}

interface CreateScheduledDrivingLessonMutation {
  schedulingDate: string
  schedulingHour: string
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  studentId: string
  className: string
  classDescription?: string
}

interface CreateScheduledDrivingLessonFormProps {
  students: {
    value: string
    label: string
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
  const disabledButton =
    lessonName?.trim() === '' ||
    !lessonDate ||
    lessonHour?.trim() === '' ||
    studentId?.trim() === ''
  const { toast } = useToast()

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

  const { mutateAsync: createScheduledDrivingLesson } = useMutation({
    mutationFn: async ({
      schedulingDate,
      schedulingHour,
      status,
      className,
      classDescription,
      studentId,
    }: CreateScheduledDrivingLessonMutation) => {
      await api.post('/scheduled-class/practical-class', {
        schedulingDate: new Date(schedulingDate).toISOString(),
        schedulingHour,
        status,
        studentId,
        className,
        classDescription,
      })
    },
  })

  async function handleCreateScheduledDrivingLessonForm(
    data: CreateScheduledDrivingLessonInputs,
  ) {
    try {
      for (const lesson of data.lessons) {
        await createScheduledDrivingLesson({
          className: lesson.lessonName,
          classDescription: lesson.lessonDescription,
          studentId: lesson.studentId,
          schedulingDate: lesson.schedulingDate,
          schedulingHour: lesson.schedulingHour,
          status: 'PENDING',
        })
      }

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
      setTimeout(() => {
        location.reload()
      }, 1800)
    } catch (error) {
      console.log(
        '🚀 ~ file: CreateScheduledDrivingLessonForm.tsx:62 ~ handleCreateScheduledDrivingLessonForm ~ error:',
        error,
      )
      toast({
        variant: 'destructive',
        title: 'Error ao tentar marcar a aula',
        description:
          'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
      })
    }
  }

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

      <textarea
        {...register('lessonDescription')}
        minLength={5}
        maxLength={460}
        placeholder="Insira a descrição da aula(Opcional)"
        className="h-[142px] w-[520px] resize-none rounded-lg border border-[#C6C6C6] bg-white px-2 py-[0.375rem] text-black outline-none"
      />

      <Select
        id="student_id"
        required={fields.length === 0}
        placeHolder="Selecione o estudante para marcar a aula"
        data={students}
        className="w-full"
        onChange={(event) => setValue('studentId', event.target.value)}
      />

      <div className="flex w-full gap-4">
        <FormField
          control={control}
          rules={{ required: fields.length === 0 }}
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
          required={fields.length === 0}
          type="time"
          className="w-28 rounded-lg border border-[#C6C6C6] px-2 outline-none"
        />
      </div>

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
