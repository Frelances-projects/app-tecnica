import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Table } from "./Table";

export function ListOfStudents() {
  return (
    <section className="w-full max-w-7xl pl-10">
      <h1 className='text-lg mt-6 font-medium mb-9'>Listagem dos Alunos</h1>
      <div  className="w-full flex gap-8 mb-11">
        <Input id='search' placeholder="Nome X" type='text' name='search_name' />
        <Button title="Pesquisar" type='submit' />
      </div>

      <Table />
    </section>
  )
}