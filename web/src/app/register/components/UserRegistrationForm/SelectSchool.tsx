import { api } from "@/lib/api";

import { Select } from "@/components/Select";

type School = {
  id: string;
  name: string;
}

type AxiosData = {
  school: School[]
}

export async function SelectSchool() {
  const { data } = await api.get<AxiosData>('/school')
  
  const formattedData = data.school.map(school => {
    return {
      value: school.id,
      label: school.name
    }
  })
  
  return (
    <Select
      data={formattedData}
      name='school'
      required
      className='!w-[18.75rem] flex flex-row items-center justify-between !rounded-[44px] shadow shadow-black !py-3 !pl-9 !pr-4 border-r-8 border-transparent'
      placeHolder='Selecione uma escola'
    />
  )
}