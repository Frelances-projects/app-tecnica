import { Skeleton } from '@/components/ui/skeleton'

export default function PricesLoading() {
  return (
    <main className="mb-16 mt-14 flex w-full flex-col gap-6 px-4 lg:max-w-[80vw] lg:px-0">
      <h1 className="text-xl">Definir Preços</h1>
      <div className="mx-auto -mt-5 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF]" />

      <section className="w-full max-w-7xl lg:pl-10">
        <h1 className="mb-9 mt-6 text-lg font-medium">Adicionar Valores</h1>

        <div className="mt-14 flex w-full flex-col gap-4 lg:max-w-[290px]">
          <Skeleton className="h-8 w-full rounded-lg md:w-[18.188rem]" />
          <fieldset className="flex w-full flex-col gap-4">
            <Skeleton className="h-8 w-full rounded-lg md:w-[18.188rem]" />
            <Skeleton className="h-8 w-full rounded-lg md:w-[18.188rem]" />
          </fieldset>
        </div>

        <Skeleton className="mt-4 h-8 w-full rounded-lg md:w-[18.188rem]" />
      </section>
    </main>
  )
}
