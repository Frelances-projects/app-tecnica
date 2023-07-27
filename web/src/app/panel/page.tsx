import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'

export default function Panel() {
  async function handleCreateInformation(data: FormData) {
    'use server'

    const name = data.get('information_name')?.toString()
    const description = data.get('information_description')?.toString()
    const checkbox = data.get('checkbox')?.toString()

    if (!name || !description) {
      return
    }

    console.log({ name, description, checkbox })
  }
  
  return (
    <main className="w-full flex items-center justify-between mt-24">
      <section className="max-w-lg">
        <h1 className='mb-11 text-xl font-medium'>Criar Informação</h1>

        <form action={handleCreateInformation} className="space-y-10">
          <fieldset className='flex items-center gap-14'>
            <label htmlFor="information-name" className='text-xs'>Nome da informação</label>
            <Input id='information-name' type='text' name='information_name' />
          </fieldset>

          <fieldset className='flex items-start gap-9'>
            <label htmlFor="information-description" className='text-xs'>Descrição da informação</label>
            <TextArea id='information-description' name='information_description' />
          </fieldset>

          <div className="flex items-center justify-end gap-20">
            <fieldset className='flex items-center'>
              <label className='mr-2' htmlFor="checkbox">Urgente</label>
              <input 
                id="checkbox" 
                type="checkbox" 
                name='checkbox' 
                className='appearance-none h-4 w-4 cursor-pointer border border-[#C6C6C6] rounded-full outline-none checked:bg-[#E3000F]' 
              />
            </fieldset>

            <Button title="Publicar" type='submit' />
          </div>
        </form>
      </section>

      <section></section>
    </main>
  )
}