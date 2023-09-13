import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function CreateInfo() {
  return (
    <main className="w-full max-w-[800px] flex flex-col gap-10 mt-14 mb-16">
      <h1 className='text-lg'>Criar Alerta</h1>
      <div className='mx-auto -mt-9 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <form className='flex flex-col gap-6 min-w-[710px] mt-6 pl-10'>
        <fieldset className='flex justify-between'>
          <label htmlFor="name">Nome do Alerta</label>
          <Input id='name' type='text' placeholder='Novas Aulas'/>
        </fieldset> 
        <fieldset className='flex justify-between'>
          <label htmlFor="date">Data do alerta</label>
        </fieldset>
        <fieldset className='flex justify-between'>
          <label htmlFor="description">Descrição do Alerta</label>
          <textarea id='description' className='w-[520px] h-[142px] bg-white border border-[#C6C6C6] outline-none rounded-lg px-2 py-[0.375rem] text-black'/>
        </fieldset>

        <Button type='submit' title='Publicar' className='ml-auto'/>
      </form>
    </main>
  )
}