import { Select } from "@/components/Select";

export function SelectFunction() {
  const userFunction = [
    { label: 'Administrativo(a)', value: 'ADMIN' },
    { label: 'Diretor', value: 'DIRECTOR' },
    { label: 'Instrutor(a)', value: 'INSTRUCTOR' },
  ]
  
  return (
    <Select
      data={userFunction}
      name='user_function'
      required
      className='!w-[18.75rem] flex flex-row items-center justify-between !rounded-[44px] shadow shadow-black !py-3 !pl-9 !pr-4 border-r-8 border-transparent'
      placeHolder='Selecione uma Função'
    />
  )
}