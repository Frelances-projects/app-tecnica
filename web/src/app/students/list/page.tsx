import { Pencil, Trash } from 'lucide-react'

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function ManageStudents() {
  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-10 mt-14 mb-16">
      <h1 className='text-xl'>Gerir Alunos</h1>
      <div className='mx-auto -mt-9 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <section className="w-full max-w-7xl -mt-4 pl-10">
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
                  Nome
                </th>
                <th scope="col" className="py-3">
                  Número
                </th>
                <th scope="col" className="py-3">
                  Email
                </th>
                <th scope="col" className="py-3">
                  Data inscrição
                </th>
                <th scope="col" className="py-3">
                  Escola de registro
                </th>
                <th scope="col" className="py-3">
                  Categoria da carta
                </th>
                <th scope="col" className="flex gap-4">
                  <Pencil size={16} className="hover:cursor-pointer" />
                  <Trash size={16} className="hover:cursor-pointer" />
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
                    $2999
                </td>
                <td className="py-4">
                    $2999
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}