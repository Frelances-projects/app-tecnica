import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

export default function RegisterStudent() {
  const categoryCard = [
    {value:"1", label:"A"},
    {value:"2", label:"B"},
    {value:"3", label:"C"},
  ]

  const paymentMethod = [
    {value:"1", label:"Pronto Pagamento"},
    {value:"2", label:"Prestações"},
  ]
  return(
    <main className="w-full max-w-[810px] flex flex-col gap-10 mt-14 mb-16">
      <h1 className='text-xl'>Gerir Alunos</h1>
      <div className='mx-auto -mt-9 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <section className="w-full max-w-7xl pl-10">
        <h1 className='mb-11 mt-5 text-lg font-medium'>Adicionar Alunos</h1>
        <form  className="flex flex-col gap-[2.08rem] mt-5 mb-4">
          <fieldset className='flex items-center gap-14'>
            <label htmlFor="student-name" className='text-xs'>Nome do Aluno</label>
            <Input id='student-name' placeholder="Nome Aluno" type='text' name='student_name' className="ml-auto" />
          </fieldset>
          <fieldset className='flex items-center gap-14'>
            <label htmlFor="student-number" className='text-xs'>Número do Aluno</label>
            <Input id='student-number' placeholder="Número Aluno" type='text' name='student_number' className="ml-auto" />
          </fieldset>
          <fieldset className='flex items-center gap-14'>
            <label htmlFor="student-email" className='text-xs'>Email do Aluno</label>
            <Input id='student-email' placeholder="Email Aluno" type='text' name='student_email' className="ml-auto" />
          </fieldset>
          <fieldset className='flex items-center gap-14'>
            <label htmlFor="student-date" className='text-xs'>Data de inscrição do Aluno</label>
            <Input id='student-date' placeholder="Data Aluno" type='text' name='student_date' className="ml-auto" />
          </fieldset>
          <fieldset className='flex items-center gap-14'>
            <label htmlFor="student-register" className='text-xs'>Escola de Registo do Aluno</label>
            <Input id='student-register' placeholder="Data Aluno" type='text' name='student_date' className="ml-auto" />
          </fieldset>
          <fieldset className='flex justify-between'>
            <label  className='text-xs'>Categoria de Carta</label>
            <Select data={categoryCard} className="w-[520px]" />
          </fieldset>

          <fieldset className='flex justify-between'>
            <label htmlFor="student-date" className='text-xs'>Método de Pagamento</label>
            <Select data={paymentMethod} className="w-[520px]"/>
          </fieldset>
          <div className="flex justify-end">
            <Button title="Adicionar" type='submit' />
          </div>
        </form>
      </section>
    </main>
  )
}