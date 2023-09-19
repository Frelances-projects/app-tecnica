import { CreateInfoForm } from "./components/CreateInfoForm";

export default function CreateInfo() {
  return (
    <main className="w-full max-w-[800px] flex flex-col gap-10 mt-14 mb-16">
      <h1 className='text-lg'>Criar Alerta</h1>
      <div className='mx-auto -mt-9 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <CreateInfoForm />
    </main>
  )
}