import { Pencil, Trash } from 'lucide-react'

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function ManageStudents() {
  return (
    <main className="w-full flex justify-center items-start gap-20 mt-24 mb-16">
      <section className="max-w-2xl w-full">
        <h1 className='mb-11 text-xl font-medium'>Listagem dos Alunos</h1>
        <div  className="w-full flex justify-between">
          <Input id='search' placeholder="Nome X" type='text' name='search_name' />
          <Button title="Pesquisar" type='submit' />
        </div>
        <ul className="flex flex-col mt-10">
          <li className="flex w-full items-center justify-between border-t-2 last:border-b-2 border-[#C6C6C6] py-3 px-1 text-xs">
            <p>João vitor</p>
            <p>123456789</p>
            <p>example@gmail.com</p>
            <p>22/09/2000</p>
            <div className="flex gap-3 items-center">
              <Pencil className="hover:cursor-pointer text-lg" />
              <Trash className="hover:cursor-pointer text-lg" />
            </div>
          </li>
          <li className="flex w-full items-center justify-between border-t-2 last:border-b-2 border-[#C6C6C6] py-3 px-1 text-xs">
            <p>João vitor</p>
            <p>123456789</p>
            <p>example@gmail.com</p>
            <p>22/09/2000</p>
            <div className="flex gap-3 items-center">
              <Pencil className="hover:cursor-pointer text-lg" />
              <Trash className="hover:cursor-pointer text-lg" />
            </div>
          </li>
          <li className="flex w-full items-center justify-between border-t-2 last:border-b-2 border-[#C6C6C6] py-3 px-1 text-xs">
            <p>João vitor</p>
            <p>123456789</p>
            <p>example@gmail.com</p>
            <p>22/09/2000</p>
            <div className="flex gap-3 items-center">
              <Pencil className="hover:cursor-pointer text-lg" />
              <Trash className="hover:cursor-pointer text-lg" />
            </div>
          </li>
          <li className="flex w-full items-center justify-between border-t-2 last:border-b-2 border-[#C6C6C6] py-3 px-1 text-xs">
            <p>João vitor</p>
            <p>123456789</p>
            <p>example@gmail.com</p>
            <p>22/09/2000</p>
            <div className="flex gap-3 items-center">
              <Pencil className="hover:cursor-pointer text-lg" />
              <Trash className="hover:cursor-pointer text-lg" />
            </div>
          </li>
        </ul>
      </section>

      <span className='border border-black h-[30rem]' />

      <section className="w-full max-w-lg">
        <h1 className='mb-11 text-xl font-medium'>Adicionar Alunos</h1>
        <form  className="flex flex-col gap-[2.08rem]">
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
          <div className="flex justify-end">
            <Button title="Adicionar" type='submit' />
          </div>
        </form>
      </section>
    </main>
  )
}