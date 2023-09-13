'use client'

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { Euro } from "lucide-react";
import { useState } from "react";

export default function DrivingLessons() {
  const [isItInstallments, setIsItInstallments] = useState('1')
  const [numberOfInstallments, setNumberOfInstallments] = useState('')

  const installment = [
    {value:"2", label:"Em 2x"},
    {value:"3", label:"Em 3x"},
    {value:"4", label:"Em 4x"},
  ]

  const paymentMethod = [
    {value:"1", label:"Pronto Pagamento"},
    {value:"2", label:"Prestações"},
  ]

  const numberOfInstallment = () => {
    const currentView = {
      "2":
          <>
            <Input placeholder="valor:" className="w-[115px]"/>
            <Input placeholder="valor:" className="w-[115px]"/>,
          </>,
      "3":
          <>
            <Input placeholder="valor:" className="w-[115px]"/>
            <Input placeholder="valor:" className="w-[115px]"/>
            <Input placeholder="valor:" className="w-[115px]"/>
          </>,
      "4":
          <>
            <Input placeholder="valor:" className="w-[115px]"/>
            <Input placeholder="valor:" className="w-[115px]"/>
            <Input placeholder="valor:" className="w-[115px]"/>
            <Input placeholder="valor:" className="w-[115px]"/>
          </>,
    }[numberOfInstallments]

    return <>{currentView}</>
  }

  return (
    <main className="w-full max-w-[80vw] flex flex-col gap-6 mt-14 mb-16">
      <h1 className='text-xl'>Definir Preços</h1>
      <div className='mx-auto -mt-5 max-w-[1440px] w-full h-[1px] bg-[#BFBFBF]'/>

      <section className="w-full max-w-7xl pl-10">
        <h1 className='text-lg mt-6 font-medium mb-9'>Adicionar Valores</h1>
        <form className="flex flex-col gap-4 mt-14 max-w-[290px]">
          <Select placeHolder="Definir Escola"/>
          <fieldset className="flex gap-4">
            <Select placeHolder="Categoria"/>
            <Input placeholder="valor:" className="max-w-[150px]"/>
          </fieldset>
          <Select onChange={(obj) => setIsItInstallments(obj.target.value)} data={paymentMethod}  placeHolder="Método de Pagamento"/>
          {isItInstallments === '2' && (
            <Select data={installment} onChange={(obj) => setNumberOfInstallments(obj.target.value)} placeHolder="Numero de Prestações"/>
          )}
          <div className="grid grid-cols-2 gap-[26px]">
            {isItInstallments === '2' && (
              numberOfInstallment()
            )}
          </div>
          <Button title="Salvar" className={`ml-auto`}/>
        </form>
      </section>
    </main>
  )
}