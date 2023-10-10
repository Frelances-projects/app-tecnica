import { Skeleton } from "@/components/ui/skeleton";

export default function PricesLoading() {
  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-6 mt-14 mb-16">
      <h1 className='text-xl'>Definir Preços</h1>
      <div className='mx-auto -mt-5 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <section className="w-full max-w-7xl pl-10">
        <h1 className='text-lg mt-6 font-medium mb-9'>Adicionar Valores</h1>

        <div className="flex flex-col gap-4 mt-14 max-w-[290px]">
          <Skeleton className='w-[18.188rem] rounded-lg h-8' />
          <fieldset className="flex gap-4 w-full">
            <Skeleton className='w-[18.188rem] rounded-lg h-8' />
            <Skeleton className='w-[18.188rem] rounded-lg h-8' />
          </fieldset>
        </div>

        <Skeleton className='w-[18.188rem] mt-4 rounded-lg h-8' />
      </section>
    </main>
  )
}