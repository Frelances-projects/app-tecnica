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

import { CreateCodeExamMutation } from "."

export interface CreateCodeExamFormInput {
  studentId: string
  testDate: string
  testHour: string
  status?: 'APPROVED' | 'DISAPPROVED' | 'MARKED'
}

interface CreateCodeExamFormProps {
  students: {
    value: string;
    label: string;
  }[]
  setIsModalOpen: (isOpen: boolean) => void
  createCodeExam: UseMutateAsyncFunction<any, Error, CreateCodeExamMutation, unknown>
}

export function CreateCodeExamForm(
  {
    students,
    setIsModalOpen,
    createCodeExam
  }: CreateCodeExamFormProps) {
  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<CreateCodeExamFormInput>()
  const { toast } = useToast()

  function handleCloseModal() {
    reset()
    setIsModalOpen(false)
  }

  async function handleCreateCodeExam(data: CreateCodeExamFormInput) {
    try {
      await createCodeExam(
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
        title: 'Exame de código marcado!',
        description: 'O Exame de código foi marcado com sucesso!'
      })
      location.reload()
    } catch (error) {
      console.log("🚀 ~ file: CreateScheduledDrivingLessonForm.tsx:62 ~ handleCreateScheduledDrivingLessonForm ~ error:", error)
      toast({
        variant: 'destructive',
        title: 'Error ao tentar marcar o Exame de código',
        description: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde'
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateCodeExam)}
      className="flex flex-col gap-[2.08rem] mt-5 mb-4"
    >
      <Select
        id="student_id"
        required
        placeHolder="Selecione o estudante para marcar o exame de código"
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
              placeholder="Selecione a data para marcar o exame de código"
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