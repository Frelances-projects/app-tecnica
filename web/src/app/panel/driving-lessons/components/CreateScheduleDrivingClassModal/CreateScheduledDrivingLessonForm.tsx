import { useForm, useFieldArray } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { X } from 'lucide-react'

import { InputModal } from "@/components/InputModal"
import { Select } from "@/components/Select"
import { DatePicker } from "@/components/ui/date-picker"
import { FormField } from "@/components/ui/form"
import { DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/Button"
import { buttonVariants } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

import { cn } from "@/lib/utils"
import { api } from "@/lib/api"
import { format } from "date-fns-tz"

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
    value: string;
    label: string;
  }[]
  setIsModalOpen: (isOpen: boolean) => void
}

export function CreateScheduledDrivingLessonForm(
  {
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
    formState: { isSubmitting }
  } = useForm<CreateScheduledDrivingLessonInputs>({ defaultValues: 
    {
      lessonName: undefined,
      lessonDescription: undefined,
      lessons: []
    }
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
  const disabledButton = lessonName?.trim() === '' || !lessonDate || lessonHour?.trim() === '' || studentId?.trim() === ''
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

  const { mutateAsync: createScheduledDrivingLesson } = useMutation(
    {
      mutationFn: async (
        {
          schedulingDate,
          schedulingHour,
          status,
          className,
          classDescription,
          studentId
        }: CreateScheduledDrivingLessonMutation
      ) => {
        await api.post('/scheduled-class/practical-class', 
          { schedulingDate: new Date(schedulingDate).toISOString(), schedulingHour, status, studentId, className, classDescription }
        )
      }
    }
  )

  async function handleCreateScheduledDrivingLessonForm(data: CreateScheduledDrivingLessonInputs) {
    try {
      data.lessons.map(async lesson => {

        await createScheduledDrivingLesson(
          { 
            className: lesson.lessonName,
            classDescription: lesson.lessonDescription,
            studentId: lesson.studentId,
            schedulingDate: lesson.schedulingDate,
            schedulingHour: lesson.schedulingHour,
            status: 'PENDING',
          }
        )
      })

      reset()
      setIsModalOpen(false)
      toast({
        title: data.lessons.length > 1 ? 'Aulas marcadas com sucesso!' : 'Aula marcada com sucesso!',
        description: data.lessons.length > 1 ? 'As aulas foram marcadas com sucesso!' : 'A aula foi marcada com sucesso!'
      })
      setTimeout(() => {
        location.reload()
      }, 1000);
    } catch (error) {
      console.log("🚀 ~ file: CreateScheduledDrivingLessonForm.tsx:62 ~ handleCreateScheduledDrivingLessonForm ~ error:", error)
      toast({
        variant: 'destructive',
        title: 'Error ao tentar marcar a aula',
        description: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde'
      })
    }
  }
  
  return (
    <form
      onSubmit={handleSubmit(handleCreateScheduledDrivingLessonForm)}
      className="flex flex-col gap-[2.08rem] mt-5 mb-4"
    >
      <InputModal
        placeholder="Insira o título da aula"
        type="text"
        required={fields.length === 0 ? true : false}
        {...register('lessonName')}
      />

      <textarea
        {...register('lessonDescription')}
        minLength={5}
        maxLength={460}
        placeholder="Insira a descrição da aula(Opcional)"
        className='resize-none w-[520px] h-[142px] bg-white border border-[#C6C6C6] outline-none rounded-lg px-2 py-[0.375rem] text-black'
      />

      <Select
        id="student_id"
        required={fields.length === 0 ? true : false}
        placeHolder="Selecione o estudante para marcar a aula"
        data={students}
        className="w-full"
        onChange={(event) => setValue('studentId', event.target.value)}
      />

      <div className="flex gap-4 w-full">
        <FormField
          control={control}
          rules={{ required: fields.length === 0 ? true : false }}
          name="schedulingDate"
          render={({ field }) => 
          (
            <DatePicker
              placeholder="Selecione a data para marcar a aula"
              field={field}
            />
          )}
        />

        <InputModal
          {...register('schedulingHour')}
          required={fields.length === 0 ? true : false}
          type="time"
          className="w-28 border border-[#C6C6C6] rounded-lg px-2 outline-none"
        />
      </div>

      <ScrollArea className="h-24">
        <div className="flex flex-col w-full items-start gap-y-2">
          {fields.map((lesson, index) => {
            const formattedLessonDate = format(new Date(lesson.schedulingDate), 'dd/MM/yyyy')

            return (
              <span
                key={lesson.id}
                className="px-2 py-1 bg-slate-100 text-slate-900 rounded-sm flex items-center justify-center font-medium truncate"
              >
                {lesson.lessonName} - {formattedLessonDate}
                <button
                  onClick={() => remove(index)}
                  className="ml-1 border border-slate-300 rounded-full p-1"
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
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mt-2 sm:mt-0"
          )}
          onClick={() => handleCloseModal()}
        >
          Cancelar
        </button>
        
        <button
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "mt-2 sm:mt-0 bg-orange-500 text-white enabled:hover:bg-orange-400"
          )}
          type="button"
          disabled={disabledButton}
          onClick={() => handleAddLessonIntoArray({ lessonName, lessonDescription, studentId, schedulingDate: new Date(lessonDate!).toISOString(), schedulingHour: lessonHour })}
        >
          Adicionar aula
        </button>

        {fields.length > 0 && (
          <Button
            type="submit"
            title={fields.length === 1 ? "Marcar aula" : "Marcar aulas"}
            disabled={isSubmitting}
            className="!w-40 !h-[2.125rem] mt-[2px]"
          />
        )}
      </DialogFooter>
    </form>
  )
}