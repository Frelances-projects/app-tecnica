import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'

import { InputModal } from '@/components/InputModal'
import { DatePicker } from '@/components/ui/date-picker'
import { FormField } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { Select } from '@/components/Select'

import { api } from '@/lib/api'
import { errorMessages } from '@/utils/errors/errorMessages'
import { Test } from '@/utils/interfaces/tests'

interface EditDrivingExamFormProps {
  test: Test
  children: ReactNode
}

interface EditDrivingExamFormInputs {
  testDate?: string
  testHour: string
  status: 'MARKED' | 'APPROVED' | 'DISAPPROVED'
}

const testStatus = [
  { value: 'MARKED', label: 'MARCADO' },
  { value: 'APPROVED', label: 'APROVADO' },
  { value: 'DISAPPROVED', label: 'REPROVADO' },
]

export function EditDrivingExamForm({
  test,
  children,
}: EditDrivingExamFormProps) {
  const { register, control, setValue, reset, handleSubmit } =
    useForm<EditDrivingExamFormInputs>({
      defaultValues: {
        testHour: test.testHour!,
        status: test.status,
      },
    })
  const { toast } = useToast()

  async function handleEditDrivingExam(data: EditDrivingExamFormInputs) {
    try {
      await api.put(`/test/${test.id}`, {
        testDate: data.testDate
          ? new Date(data.testDate).toISOString()
          : new Date(test.testDateNotFormatted!).toISOString(),
        testHour: data.testHour,
        status: data.status,
      })

      reset()
      toast({
        title: 'Exame de condução atualizado!',
        description: 'O exame de condução foi atualizado com sucesso!',
      })
      location.reload()
    } catch (error) {
      console.log(
        '🚀 ~ file: EditScheduledClassForm.tsx:62 ~ handleEditCodeExam ~ error:',
        error,
      )
      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          if (error.response?.data.message === errorMessages.testNotFound) {
            return toast({
              title: 'Exame de condução não encontrado!',
              description: 'Parece que esse exame de condução já foi deletado!',
              variant: 'destructive',
            })
          }
        } else {
          return toast({
            title: 'Erro!',
            description:
              'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
            variant: 'destructive',
          })
        }
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleEditDrivingExam)}
      className="mb-4 mt-5 flex flex-col gap-[2.08rem]"
    >
      <Select
        id="test_status"
        placeHolder="Selecione o Status do exame de condução"
        data={testStatus}
        className="w-full"
        onChange={(event) =>
          setValue(
            'status',
            event.target.value as 'MARKED' | 'APPROVED' | 'DISAPPROVED',
          )
        }
      />

      <div className="flex w-full gap-4">
        <FormField
          control={control}
          name="testDate"
          render={({ field }) => (
            <DatePicker
              placeholder="Selecione a data para marcar o exame de condução"
              field={field}
            />
          )}
        />

        <InputModal
          {...register('testHour')}
          type="time"
          className="w-28 rounded-lg border border-[#C6C6C6] px-2 outline-none"
        />
      </div>

      {children}
    </form>
  )
}
