import { useForm } from "react-hook-form"
import { UseMutateAsyncFunction } from "@tanstack/react-query"

import { DialogFooter } from "@/components/ui/dialog"
import { Select } from "@/components/Select"
import { FormField } from "@/components/ui/form"
import { InputModal } from "@/components/InputModal"
import { DatePicker } from "@/components/ui/date-picker"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/Button"
import { useToast } from "@/components/ui/use-toast"

import { cn } from "@/lib/utils"

import { CreateDrivingExamMutation } from "."

export interface CreateDrivingExamFormInput {
  studentId: string
  testDate: string
  testHour: string
  status?: 'APPROVED' | 'DISAPPROVED' | 'MARKED'
}

interface CreateDrivingExamFormProps {
  students: {
    value: string;
    label: string;
  }[]
  setIsModalOpen: (isOpen: boolean) => void
  createDrivingExam: UseMutateAsyncFunction<any, Error, CreateDrivingExamMutation, unknown>
}

export function CreateDrivingExamForm(
  {
    students,
    setIsModalOpen,
    createDrivingExam
  }: CreateDrivingExamFormProps) {
  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<CreateDrivingExamFormInput>()
  const { toast } = useToast()

  function handleCloseModal() {
    reset()
    setIsModalOpen(false)
  }

  async function handleCreateDrivingExam(data: CreateDrivingExamFormInput) {
    try {
      await createDrivingExam(
        {
          status: 'MARKED',
          studentId: data.studentId,
          testDate: new Date(data.testDate).toISOString(),
          testHour: data.testHour
        }
      )

      reset()
      setIsModalOpen(false)
      toast({
        title: 'Exame de condução marcado!',
        description: 'O Exame de condução foi marcado com sucesso!'
      })
      location.reload()
    } catch (error) {
      console.log("🚀 ~ file: CreateScheduledDrivingLessonForm.tsx:62 ~ handleCreateScheduledDrivingLessonForm ~ error:", error)
      toast({
        variant: 'destructive',
        title: 'Error ao tentar marcar o Exame de condução',
        description: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde'
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateDrivingExam)}
      className="flex flex-col gap-[2.08rem] mt-5 mb-4"
    >
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
          rules={{ required: true }}
          control={control}
          name="testDate"
          render={({ field }) => 
          (
            <DatePicker
              placeholder="Selecione a data para marcar o exame de condução"
              field={field}
            />
          )}
        />

        <InputModal
          {...register('testHour')}
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
          title="Marcar Exame"
          disabled={isSubmitting}
          className="!w-40 !h-[2.125rem] mt-[2px]"
        />
      </DialogFooter>
    </form>
  )
}