'use client'
import { FormEvent, useState } from "react";
import { revalidatePath } from 'next/cache'
import { EuroIcon } from "lucide-react";
import { AxiosError } from "axios";

import { api } from "@/lib/api";

import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { NumberOfInstallment } from "./NumberOfInstallment";
import { EuroInput } from "./EuroInput";
import { useToast } from "@/components/ui/use-toast";

interface CreatePricesFormProps {
  schools: {
    label: string,
    value: string
  }[]
}

export function CreatePricesForm({ schools }: CreatePricesFormProps) {
  const { toast } = useToast()

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [numberOfInstallments, setNumberOfInstallments] = useState('')
  const [totalValue, setTotalValue] = useState('')
  const [firstInstallment, setFirstInstallment] = useState('')
  const [secondInstallment, setSecondInstallment] = useState('')
  const [thirdInstallment, setThirdInstallment] = useState('')
  const [fourthInstallment, setFourthInstallment] = useState('')
  const [driverLicenseCategoryName, setDriverLicenseCategoryName] = useState('')
  const [selectSchool, setSelectSchool] = useState('')

  const installment = [
    { value: "2", label: "Em 2x" },
    { value: "3", label: "Em 3x" },
    { value: "4", label: "Em 4x" },
  ]

  async function handleCreateDriverLicenseCategory(event: FormEvent) {
    try {
      setIsButtonDisabled(true)
      event.preventDefault()

      const formattedPrice = totalValue.replace(',', '.')
      const formattedFirstInstallment = firstInstallment.replace(',', '.')
      const formattedSecondInstallment = secondInstallment.replace(',', '.')
      const formattedThirdInstallment = thirdInstallment.trim() === '' ? undefined : thirdInstallment.replace(',', '.')
      const formattedFourthInstallment = fourthInstallment.trim() === '' ? undefined : fourthInstallment.replace(',', '.')

      await api.post(`/driver-license-category`, {
        name: driverLicenseCategoryName,
        price: Number(formattedPrice),
        schoolId: selectSchool,
        firstInstallment: Number(formattedFirstInstallment),
        secondInstallment: Number(formattedSecondInstallment),
        thirdInstallment: formattedThirdInstallment,
        fourthInstallment: formattedFourthInstallment
      })

      setNumberOfInstallments('')
      setTotalValue('')
      setFirstInstallment('')
      setSecondInstallment('')
      setThirdInstallment('')
      setFourthInstallment('')
      setDriverLicenseCategoryName('')
      setSelectSchool('')

      toast({
        title: 'Categoria cadastrada!',
        description: 'Categoria cadastrada com sucesso!',
      })

      revalidatePath('/panel/students/register')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: 'Error!',
          description: 'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
          variant: 'destructive'
        })
      }
    } finally {
      setIsButtonDisabled(false)
    }
  }

  return (
    <form
      onSubmit={handleCreateDriverLicenseCategory}
      className="flex flex-col gap-4 mt-14 max-w-[290px]"
    >
      <Select
        placeHolder="Definir Escola"
        required
        data={schools}
        value={selectSchool}
        onChange={(event) => setSelectSchool(event.target.value)}
      />

      <fieldset className="flex gap-4 w-full">
        <input
          required
          placeholder="Nome da categoria"
          className="w-[18.188rem] outline-none border border-[#C6C6C6] bg-white rounded-lg px-2 py-[0.375rem] text-black"
          type="text"
          value={driverLicenseCategoryName}
          onChange={(event) => setDriverLicenseCategoryName(event.target.value)}
        />

        <div className="flex items-center justify-center gap-1">
          <EuroInput
            formattedValue={totalValue}
            setFormattedValue={setTotalValue}
          />
          <EuroIcon size={22} />
        </div>
      </fieldset>

      <Select
        data={installment}
        required
        onChange={(obj) => setNumberOfInstallments(obj.target.value)}
        placeHolder="Numero de Prestações"
      />

      <div className="grid grid-cols-2 gap-[26px]">
        <NumberOfInstallment
          numberOfInstallments={numberOfInstallments}
          firstInstallment={firstInstallment}
          setFirstInstallment={setFirstInstallment}
          secondInstallment={secondInstallment}
          setSecondInstallment={setSecondInstallment}
          thirdInstallment={thirdInstallment}
          setThirdInstallment={setThirdInstallment}
          fourthInstallment={fourthInstallment}
          setFourthInstallment={setFourthInstallment}
        />
      </div>

      <Button
        title="Salvar"
        disabled={isButtonDisabled}
        type="submit"
        className={`ml-auto`}
      />
    </form>
  )
}