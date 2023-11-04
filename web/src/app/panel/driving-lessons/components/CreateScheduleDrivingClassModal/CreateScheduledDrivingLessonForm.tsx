import { useForm } from "react-hook-form"

import { InputModal } from "@/components/InputModal"
import { Select } from "@/components/Select"
import { DatePicker } from "@/components/ui/date-picker"
import { FormField } from "@/components/ui/form"
import { DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/Button"
import { buttonVariants } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useMutation } from "@tanstack/react-query"

import { cn } from "@/lib/utils"
import { api } from "@/lib/api"

interface CreateScheduledDrivingLessonInputs {
  lessonId?: string
  lessonName?: string
  lessonDescription?: string
  schedulingDate: string
  schedulingHour: string
  studentId: string
}

interface CreateClassMutation {
  name: string
  description?: string
}

interface CreateScheduledDrivingLessonMutation {
  schedulingDate: string
  schedulingHour: string
  status?: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
  studentId: string
  classId: string
}

interface CreateScheduledDrivingLessonFormProps {
  selectedLessonId?: string
  setSelectedLessonId: (value: string | undefined) => void
  students: {
    value: string;
    label: string;
  }[]
  setIsModalOpen: (isOpen: boolean) => void
  setShowCreateScheduledForm: (isOpen: boolean) => void
}

export function CreateScheduledDrivingLessonForm(
  {
    selectedLessonId,
    setSelectedLessonId,
    students,
    setIsModalOpen,
    setShowCreateScheduledForm
  }: CreateScheduledDrivingLessonFormProps) {
  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<CreateScheduledDrivingLessonInputs>({ defaultValues: 
    {
      lessonId: selectedLessonId,
      lessonName: undefined,
      lessonDescription: undefined,
    }
  })
  const { toast } = useToast()

  function handleCloseModal() {
    reset()
    setSelectedLessonId(undefined)
    setShowCreateScheduledForm(false)
    setIsModalOpen(false)
  }

  const { mutateAsync: handleCreateClass } = useMutation(
    {
      mutationFn: async ({ name, description }: CreateClassMutation) => {
        const { data } = await api.post('/class', { name, description, category: 'PRACTICAL' })

        return data.class
      }
    }
  )

  const { mutateAsync: createScheduledDrivingLesson } = useMutation(
    {
      mutationFn: async (
        {
          schedulingDate,
          schedulingHour,
          status,
          classId,
          studentId
        }: CreateScheduledDrivingLessonMutation
      ) => {
        await api.post('/scheduled-class', 
          { schedulingDate: new Date(schedulingDate).toISOString(), schedulingHour, status, studentId, classId }
        )
      }
    }
  )

  async function handleCreateScheduledDrivingLessonForm(data: CreateScheduledDrivingLessonInputs) {
    try {
      let classId = data.lessonId

      if (!selectedLessonId) {
        const { id } = await handleCreateClass(
          { name: data.lessonName!, description: data.lessonDescription }
        )

        classId = id
      }

      await createScheduledDrivingLesson(
        { 
          classId: classId!,
          studentId: data.studentId,
          schedulingDate: data.schedulingDate,
          schedulingHour: data.schedulingHour,
          status: 'PENDING',
        }
      )

      reset()
      setIsModalOpen(false)
      setShowCreateScheduledForm(false)
      setSelectedLessonId(undefined)
      toast({
        title: 'Aula marcada com sucesso!',
        description: 'A aula foi marcada com sucesso!'
      })
      location.reload()
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
      {!selectedLessonId &&  (
        <>
          <InputModal
            placeholder="Digite o título da aula"
            type="text"
            required={!selectedLessonId}
            {...register('lessonName')}
          />

          <textarea
            {...register('lessonDescription')}
            required={!selectedLessonId}
            minLength={5}
            maxLength={460}
            placeholder="Digite a descrição da aula(Opcional)"
            className='resize-none w-[520px] h-[142px] bg-white border border-[#C6C6C6] outline-none rounded-lg px-2 py-[0.375rem] text-black'
          />
        </>
      )}

      <Select
        id="student_id"
        required
        placeHolder="Selecione o estudante para marcar a aula"
        data={students}
        className="w-full"
        onChange={(event) => setValue('studentId', event.target.value)}
      />

      <div className="flex gap-4 w-full">
        <FormField
          control={control}
          rules={{ required: true }}
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
          required
          type="time"
          className="w-28 border border-[#C6C6C6] rounded-lg px-2 outline-none"
        />
      </div>

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
        
        <Button
          type="submit"
          title="Marcar aula"
          disabled={isSubmitting}
          className="!w-40 !h-[2.125rem] mt-[2px]"
        />
      </DialogFooter>
    </form>
  )
}