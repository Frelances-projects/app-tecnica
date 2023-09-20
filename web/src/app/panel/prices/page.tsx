import { CreatePricesSection } from "./components/CreatePricesSection";

export default function DrivingLessons() {
  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-6 mt-14 mb-16">
      <h1 className='text-xl'>Definir Preços</h1>
      <div className='mx-auto -mt-5 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <CreatePricesSection />
    </main>
  )
}