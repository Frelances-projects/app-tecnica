import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

export default function CreateClasses() {
  async function handleInsetClasses(data: FormData) {
    'use server'

    const category = data.get('category_name')?.toString()
    const classe = data.get('classe_name')?.toString()

    if (!category || !classe) {
      return
    }

    console.log({ category, classe })
  }

  return (
    <main className="w-full flex justify-center items-start gap-24 mt-24 mb-16">
      <section className="max-w-lg pt-6">
        <h1 className='mb-11 text-xl font-medium'>Inserir Aulas de Código</h1>
        <form action={handleInsetClasses} className="space-y-10">
          <fieldset className='flex items-center gap-14'>
            <label htmlFor="category-name" className='text-xs'>Nome da Categoria</label>
            <Input id='category-name' placeholder="Categoria X" type='text' name='category_name' />
          </fieldset>
          <fieldset className='flex items-center gap-[5.5rem]'>
            <label htmlFor="classe-name" className='text-xs'>Nome da Aula</label>
            <Input id='classe-name' placeholder="Aula X" type='text' name='classe_name' />
          </fieldset>
          <div className="flex justify-end">
            <Button title="Publicar" type='submit' />
          </div>
        </form>
      </section>

      <span className='border border-black h-[30rem]' />

      <section className="max-w-lg pt-6">
        <h1 className='mb-11 text-xl font-medium'>Listagem das Aulas de Código</h1>
        <form  className="flex flex-col gap-[2.08rem]">
          <fieldset className='flex items-center gap-14'>
            <label htmlFor="information-name" className='text-xs'>Nome da Categoria</label>
            <Select />
          </fieldset>
          <fieldset className='flex items-center gap-[5.5rem]'>
            <label htmlFor="information-name" className='text-xs'>Nome da Aula</label>
            <Select />
          </fieldset>
          <div className="flex justify-end">
            <Button title="Editar" type='submit' />
          </div>
        </form>
      </section>
    </main>
  )
}