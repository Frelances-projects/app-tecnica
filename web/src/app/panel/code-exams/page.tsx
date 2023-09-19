import { ListOfStudents } from './components/ListOfStudents';

export default function CodeExams() {
  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-6 mt-14 mb-16">
      <h1 className='text-xl'>Exames Código</h1>
      <div className='mx-auto -mt-5 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <ListOfStudents />
    </main>
  )
}