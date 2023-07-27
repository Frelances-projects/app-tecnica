import { Input } from '../../components/Input'

export default function Panel() {
  return (
    <main className="w-full flex items-center justify-between">
      <section className="max-w-[29.438rem]">
        <h1>Criar Informação</h1>

        <fieldset>
          <label htmlFor="information-name">Nome da informação</label>
          <Input id='information-name' type='text' />
        </fieldset>

        <fieldset></fieldset>
      </section>

      <section></section>
    </main>
  )
}