import { Input } from '../../components/Input'
import { TextArea } from '../../components/TextArea'
import { Button } from '../../components/Button'
import { Select } from '@/components/Select'

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
  
  async function handleUpdateInformation(data: FormData) {
    'use server'

    const name = data.get('new_information_name')?.toString()
    const description = data.get('new_information_description')?.toString()

    if (!name || !description) {
      return
    }

    console.log({ name, description })
  }
  
  return (
    <main className="w-full flex justify-center items-center gap-32 mt-24 mb-16">
      <section className="max-w-lg">
        <h1 className='mb-11 text-xl font-medium'>Criar Informação</h1>

        <form action={handleCreateInformation} className="space-y-10">
          <fieldset className='flex items-center gap-14'>
            <label htmlFor="information-name" className='text-xs'>Nome da informação</label>
            <Input id='information-name' type='text' name='information_name' />
          </fieldset>

          <fieldset className='flex items-start gap-9'>
            <label htmlFor="information-description" className='text-xs'>Descrição da informação</label>
            <TextArea id='information-description' name='information_description' className='h-[11.438rem]'/>
          </fieldset>

          <div className="flex ml-auto w-[18.5rem] items-center justify-between">
            <fieldset className='flex gap-3 items-center'>
              <label htmlFor="checkbox">Urgente</label>
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

      <span className='border border-black h-[30rem]' />

      <section className="max-w-lg">
        <h1 className='mb-11 text-xl font-medium'>Editar Informação</h1>

        <form action={handleUpdateInformation} className="flex flex-col gap-[2.08rem]">
          <fieldset className='flex items-center gap-14'>
            <label htmlFor="information-name" className='text-xs'>Nome da informação</label>
            <Select />
          </fieldset>

          <fieldset className='flex items-center gap-[1.6rem]'>
            <label htmlFor="new-information-name" className='text-xs'>Novo nome da informação</label>
            <Input id='new-information-name' type='text' name='new_information_name' />
          </fieldset>

          <fieldset className='flex items-start gap-16'>
            <label htmlFor="information-description" className='text-xs w-28'>Nova descrição da informação</label>
            <TextArea id='information-description' name='new_information_description'  className='h-[7.813rem]'/>
          </fieldset>
          <div className="flex justify-end">
            <Button title="Publicar" type='submit' />
          </div>
        </form>
      </section>
    </main>
  )
}