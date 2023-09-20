import { CreatePricesForm } from "./CreatePricesForm"

export function CreatePricesSection() {
  return (
    <section className="w-full max-w-7xl pl-10">
      <h1 className='text-lg mt-6 font-medium mb-9'>Adicionar Valores</h1>
      
      <CreatePricesForm />
    </section>
  )
}