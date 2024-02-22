import { useForm } from 'react-hook-form'

import { InputModal } from '@/components/InputModal'
import { DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/Button'
import { buttonVariants } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Combobox } from '@/components/ui/Combobox'

import { cn } from '@/lib/utils'
import { createManyScheduledDrivingLesson } from './actions'

export interface CreateManyScheduledDrivingLessonInputs {
  totalClasses: number
  studentId: string
}

interface CreateManyScheduledDrivingLessonFormProps {
  students: {
    value: string
    label: string
    number?: string
    vehicles?: string[]
  }[]
  setIsModalOpen: (isOpen: boolean) => void
}

export function CreateManyScheduledDrivingLessonForm({
  students,
  setIsModalOpen,
}: CreateManyScheduledDrivingLessonFormProps) {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateManyScheduledDrivingLessonInputs>()
  const { toast } = useToast()

  function handleCloseModal() {
    reset()
    setIsModalOpen(false)
  }

  async function handleCreateManyScheduledDrivingLessonForm(
    data: CreateManyScheduledDrivingLessonInputs,
  ) {
    const { message } = await createManyScheduledDrivingLesson(data)

    if (message === 'Success!') {
      reset()
      setIsModalOpen(false)
      toast({
        title: 'Aulas cadastradas!',
        description: 'As aulas de condução foram criadas com sucesso!',
      })
    } else {
      toast({
        variant: 'destructive',
        title: 'Erro!',
        description: message,
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreateManyScheduledDrivingLessonForm)}
      className="mb-4 mt-5 flex flex-col gap-[2.08rem]"
    >
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

      <InputModal
        type="number"
        {...register('totalClasses')}
        placeholder="Total de aulas anteriores do aluno"
        required
      />

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
          title="Criar aulas"
          disabled={isSubmitting}
          className="mt-[2px] !h-[2.125rem] w-full md:!w-40"
        />
      </DialogFooter>
    </form>
  )
}
