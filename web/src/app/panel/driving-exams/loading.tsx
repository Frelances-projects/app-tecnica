import { Skeleton } from '@/components/ui/skeleton'

export default function DrivingExamsLoading() {
  return (
    <main className="mb-16 mt-14 flex w-full flex-col gap-10 px-4 md:max-w-[80vw] md:px-0">
      <h1 className="text-xl">Exames Condução</h1>
      <div className="mx-auto -mt-9 h-[1px] w-full max-w-[1440px] bg-[#BFBFBF]" />

      <section className="-mt-4 w-full max-w-7xl md:pl-10">
        <h1 className="mb-9 mt-6 text-lg font-medium">
          Listagem dos Exames de condução marcados
        </h1>

        <Skeleton className="h-8 w-full rounded-lg md:w-[520px]" />
        <Skeleton className="mt-11 h-72 w-full rounded-lg" />
      </section>
    </main>
  )
}
