'use client'
import { useState } from "react";
import { Euro } from "lucide-react";

import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { NumberOfInstallment } from "./NumberOfInstallment";

export function CreatePricesForm() {
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

  return (
    <form className="flex flex-col gap-4 mt-14 max-w-[290px]">
      <Select placeHolder="Definir Escola" />

      <fieldset className="flex gap-4">
        <Select placeHolder="Categoria"/>
        <input placeholder="valor:" className="max-w-[150px]"/>
      </fieldset>

      <Select
        onChange={(obj) => setIsItInstallments(obj.target.value)}
        data={paymentMethod}
        placeHolder="Método de Pagamento"
      />
      
      {isItInstallments === '2' && (
        <Select 
          data={installment}
          onChange={(obj) => setNumberOfInstallments(obj.target.value)}
          placeHolder="Numero de Prestações"
        />
      )}

      <div className="grid grid-cols-2 gap-[26px]">
        {isItInstallments === '2' && (
          NumberOfInstallment({ numberOfInstallments })
        )}
      </div>

      <Button title="Salvar" className={`ml-auto`}/>
    </form>
  )
}