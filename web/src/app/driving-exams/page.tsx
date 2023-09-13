import { CalendarPlus } from 'lucide-react'

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function DrivingExams() {
  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-6 mt-14 mb-16">
      <h1 className='text-xl'>Exames Condução</h1>
      <div className='mx-auto -mt-5 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <section className="w-full max-w-7xl pl-10">
        <h1 className='text-lg mt-6 font-medium mb-9'>Listagem dos Alunos</h1>
        <div  className="w-full flex gap-8 mb-11">
          <Input id='search' placeholder="Nome X" type='text' name='search_name' />
          <Button title="Pesquisar" type='submit' />
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase">
              <tr>
                <th scope="col" className="py-3">
                  Nome do Aluno
                </th>
                <th scope="col" className="py-3">
                  Número do Aluno
                </th>
                <th scope="col" className="py-3">
                  Email do Aluno
                </th>
                <th scope="col" className="py-3">
                  Data inscrição do Aluno
                </th>
                <th scope="col" className="py-3">
                  Escola de registro do Aluno
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b">
                <td className="py-4">
                    Silver
                </td>
                <td className="py-4">
                    Laptop
                </td>
                <td className="py-4">
                    $2999
                </td>
                <td className="py-4">
                    $2999
                </td>
                <td className="py-4">
                    $2999
                </td>
                <td className="py-4">
                  <CalendarPlus size={16} className="hover:cursor-pointer text-[#222222]" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}