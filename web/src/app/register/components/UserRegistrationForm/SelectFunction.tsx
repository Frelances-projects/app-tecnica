import { Select } from '@/components/Select'

export function SelectFunction() {
  const userFunction = [
    { label: 'Administrativo(a)', value: 'ADMIN' },
    { label: 'Diretor', value: 'DIRECTOR' },
    { label: 'Instrutor(a)', value: 'INSTRUCTOR' },
  ]

  return (
    <Select
      data={userFunction}
      name="user_function"
      required
      className="flex !w-[18.75rem] flex-row items-center justify-between !rounded-[44px] border-r-8 border-transparent !py-3 !pl-9 !pr-4 shadow shadow-black"
      placeHolder="Selecione uma Função"
    />
  )
}
