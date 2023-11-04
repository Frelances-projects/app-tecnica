import { cookies } from 'next/headers'
import { format } from 'date-fns-tz'

import { api } from '@/lib/api';

import { CodeLessonsList } from './components/CodeLessonsList';

import { Class } from '@/utils/interfaces/class';

type AxiosData = {
  classes: Class[]
}

export default async function CodeLessons() {
  const { data } = await api.get<AxiosData>(`/class/category/class-category`, 
    { params: { category: 'THEORETICAL' } }
  )
  
  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-6 mt-14 mb-16">
      <h1 className='text-xl'>Aulas de Código</h1>
      <div className='mx-auto -mt-5 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>
      
      <CodeLessonsList
        classes={data.classes}
      />
    </main>
  )
}