import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

export default function EditInfo() {
  return (
    <main className="w-full max-w-[800px] flex flex-col gap-10 mt-14 mb-16">
      <h1 className='text-lg'>Editar Alerta</h1>
      <div className='mx-auto -mt-9 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <form className='flex flex-col gap-6 min-w-[710px] mt-6 pl-10'>
        <fieldset className='flex justify-between'>
          <label htmlFor="name">Encontrar Alerta</label>
          <Select className='w-[520px]'/>
        </fieldset>
        <fieldset className='flex justify-between'>
          <label htmlFor="name">Alterar titulo do Alerta</label>
          <Input id='name' type='text' placeholder='Novas Aulas'/>
        </fieldset>
        <fieldset className='flex justify-between'>
          <label htmlFor="date">Alterar data do Alerta</label>
        </fieldset>
        <fieldset className='flex justify-between'>
          <label htmlFor="description">Alterar descrição do Alerta</label>
          <textarea id='description' className='w-[520px] h-[142px] bg-white border border-[#C6C6C6] outline-none rounded-lg px-2 py-[0.375rem] text-black'/>
        </fieldset>

        <div className='ml-auto flex gap-16'>
          <Button type='submit' title='Apagar Alerta' className="w-[173px]"/>
          <Button type='submit' title='Editar'/>
        </div>
      </form>
    </main>
  )
}