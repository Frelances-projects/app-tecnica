import { Skeleton } from "@/components/ui/skeleton";

export default function DrivingLessonsLoading() {
  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-10 mt-14 mb-16">
       <h1 className='text-xl'>Aulas Condução</h1>
      <div className='mx-auto -mt-9 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <section className="w-full max-w-7xl -mt-4 pl-10">
      <h1 className='text-lg mt-6 font-medium mb-9'>Listagem dos Alunos</h1>
      
      <Skeleton className='w-[520px] rounded-lg h-8' />
      <Skeleton className='mt-11 w-full rounded-lg h-72' />
    </section>
    </main>
  )
}