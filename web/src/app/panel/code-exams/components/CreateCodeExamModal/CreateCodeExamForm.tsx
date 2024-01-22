import { useForm } from 'react-hook-form'

import { DialogFooter } from '@/components/ui/dialog'
import { FormField } from '@/components/ui/form'
import { InputModal } from '@/components/InputModal'
import { DatePicker } from '@/components/ui/date-picker'
import { buttonVariants } from '@/components/ui/button'
import { Button } from '@/components/Button'
import { useToast } from '@/components/ui/use-toast'
import { Combobox } from '@/components/ui/Combobox'

import { cn } from '@/lib/utils'
import { createCodeExam } from './action'

export interface CreateCodeExamFormInput {
  studentId: string
  testDate: string
  testHour: string
  place?: string
  status?: 'APPROVED' | 'DISAPPROVED' | 'MARKED'
}

interface CreateCodeExamFormProps {
  students: {
    value: string
    label: string
    number?: string
  }[]
  setIsModalOpen: (isOpen: boolean) => void
}

export function CreateCodeExamForm({
  students,
  setIsModalOpen,
}: CreateCodeExamFormProps) {
  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateCodeExamFormInput>()
  const { toast } = useToast()

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

  return (
    <form
      onSubmit={handleSubmit(handleCreateCodeExam)}
      className="mb-4 mt-5 flex flex-col gap-[2.08rem]"
    >
      <Combobox
        data={students}
        onSelect={(value) => setValue('studentId', value)}
        placeholder="Selecione o estudante para marcar o exame de código"
        inputPlaceholder="Digite o número do estudante"
        emptyHeading="Estudante não encontrado."
      />

      <InputModal
        placeholder="Local do exame"
        type="text"
        {...register('place')}
      />

      <div className="flex w-full gap-4">
        <FormField
          rules={{ required: true }}
          control={control}
          name="testDate"
          render={({ field }) => (
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
          className="w-28 rounded-lg border border-[#C6C6C6] px-2 outline-none"
        />
      </div>

      <DialogFooter>
        <button
          className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0')}
          onClick={() => handleCloseModal()}
        >
          Cancelar
        </button>

        <Button
          type="submit"
          title="Marcar Exame"
          disabled={isSubmitting}
          className="mt-[2px] !h-[2.125rem] !w-40"
        />
      </DialogFooter>
    </form>
  )
}
