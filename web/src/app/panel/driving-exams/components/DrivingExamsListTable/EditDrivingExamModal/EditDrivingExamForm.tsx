import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { InputModal } from '@/components/InputModal'
import { DatePicker } from '@/components/ui/date-picker'
import { FormField } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { Select } from '@/components/Select'

import { editDrivingExam } from './action'

import { Test } from '@/utils/interfaces/tests'

interface EditDrivingExamFormProps {
  test: Test
  children: ReactNode
}

export interface EditDrivingExamFormInputs {
  testDate?: string
  testHour: string
  status: 'MARKED' | 'APPROVED' | 'DISAPPROVED'
  instructorId: string
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
  const { register, control, watch, setValue, reset, handleSubmit } =
    useForm<EditDrivingExamFormInputs>({
      defaultValues: {
        testHour: test.testHour!,
        status: test.status,
        instructorId: test.instructorId,
      },
    })
  const { toast } = useToast()

  const instructors = test.student.school.users?.filter(
    (user) => user.function === 'INSTRUCTOR',
  )

  async function handleEditDrivingExam(data: EditDrivingExamFormInputs) {
    const { message } = await editDrivingExam({
      testId: test.id,
      testDateNotFormatted: test.testDateNotFormatted!,
      data,
    })

    if (message === 'Success!') {
      reset()
      toast({
        title: 'Exame de condução atualizado!',
        description: 'O exame de condução foi atualizado com sucesso!',
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

      <Select
        placeHolder="Selecione o instrutor para o teste"
        data={instructors?.map((instructor) => {
          return {
            label: instructor.name,
            value: instructor.id,
          }
        })}
        className="w-full"
        value={watch('instructorId')}
        onChange={(event) => setValue('instructorId', event.target.value)}
      />

      {children}
    </form>
  )
}
