import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { DialogFooter } from '@/components/ui/dialog'
import { FormField } from '@/components/ui/form'
import { InputModal } from '@/components/InputModal'
import { DatePicker } from '@/components/ui/date-picker'
import { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/Button'
import { useToast } from '@/components/ui/use-toast'
import { Combobox } from '@/components/ui/Combobox'
import { Select } from '@/components/Select'

import { cn } from '@/lib/utils'
import { createCodeExam } from './action'

import type { User } from '@/utils/interfaces/user'

export interface CreateCodeExamFormInput {
  studentId: string
  testDate: string
  testHour: string
  instructorId: string
  place?: string
  status?: 'APPROVED' | 'DISAPPROVED' | 'MARKED'
}

interface CreateCodeExamFormProps {
  students: {
    value: string
    label: string
    number?: string
    school?: {
      id: string
      name: string
      users?: User[]
    }
  }[]
  setIsModalOpen: (isOpen: boolean) => void
}

export function CreateCodeExamForm({
  students,
  setIsModalOpen,
}: CreateCodeExamFormProps) {
  const [instructors, setInstructors] = useState<
    { label: string; value: string }[]
  >([])

  const {
    register,
    control,
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateCodeExamFormInput>()
  const { toast } = useToast()

  const studentId = watch('studentId')

  function handleCloseModal() {
    reset()
    setIsModalOpen(false)
  }

  async function handleCreateCodeExam(data: CreateCodeExamFormInput) {
    const { message } = await createCodeExam(data)

    if (message === 'Success!') {
      reset()
      setIsModalOpen(false)
      toast({
        title: 'Exame de código marcado!',
        description: 'O Exame de código foi marcado com sucesso!',
      })
    } else {
      toast({
        title: 'Erro!',
        description: message,
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    const student = students.find((student) => student.value === studentId)

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
      onSubmit={handleSubmit(handleCreateCodeExam)}
      className="mb-4 mt-5 flex w-full flex-col gap-[2.08rem]"
    >
      <fieldset>
        <label htmlFor="fileInput" className="text-sm">
          Selecione o estudante para marcar o exame de código
        </label>

        <Combobox
          data={students}
          onSelect={(value) => setValue('studentId', value)}
          placeholder="Selecione o estudante"
          inputPlaceholder="Digite o número do estudante"
          emptyHeading="Estudante não encontrado."
        />
      </fieldset>

      <InputModal
        placeholder="Local e hora de saída do exame"
        type="text"
        {...register('place')}
      />

      <Select
        disabled={instructors.length === 0}
        placeHolder="Selecione o instrutor"
        data={instructors}
        className="w-full lg:w-full"
        onChange={(event) => setValue('instructorId', event.target.value)}
      />

      <div className="flex w-full gap-4">
        <FormField
          rules={{ required: true }}
          control={control}
          name="testDate"
          render={({ field }) => (
            <DatePicker placeholder="Selecione uma data" field={field} />
          )}
        />

        <InputModal
          {...register('testHour')}
          required
          type="time"
          className="w-max rounded-lg border border-[#C6C6C6] px-2 outline-none lg:w-28"
        />
      </div>

      <DialogFooter>
        <button
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'mt-2 sm:mt-0 md:mr-auto',
          )}
          onClick={() => handleCloseModal()}
        >
          Cancelar
        </button>

        <Button
          type="submit"
          title="Marcar Exame"
          disabled={isSubmitting}
          className="mt-[2px] !h-[2.125rem] w-full md:!w-40"
        />
      </DialogFooter>
    </form>
  )
}
