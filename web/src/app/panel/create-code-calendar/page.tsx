import { CreateCodeCalendarForm } from "./components/CreateCodeCalendarForm";

export default function CreateCodeCalendar() {
  return (
    <div className="w-full max-w-[810px] flex flex-col gap-3 mt-14 mb-16">
      <h1 className='text-lg'>Adicionar Calendário Código</h1>
      <div className='mx-auto -mt-1 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <CreateCodeCalendarForm />
    </div>

  )
}