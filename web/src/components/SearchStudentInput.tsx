import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export function SearchStudentInput() {
  return (
    <div  className="w-full flex gap-8 mb-11">
      <Input id='search' placeholder="Nome X" type='text' name='search_name' />
      <Button title="Pesquisar" type='submit' />
    </div>
  )
}