'use client'
import { useState, type FormEvent, type Dispatch, type SetStateAction } from "react"
import { EuroIcon } from "lucide-react"
import { AxiosError } from "axios"

import { useToast } from "@/components/ui/use-toast"
import { Select } from "@/components/Select"

import { NumberOfInstallment } from "../../../register/components/CreatePricesSection/NumberOfInstallment"
import { EuroInput } from "../../../register/components/CreatePricesSection/EuroInput"
import { Button } from "@/components/Button"

import { api } from "@/lib/api"
import type { DriverLicenseCategory } from "@/utils/interfaces/driver-license-category"

interface EditDriverLicenseCategoryFormProps {
  driverLicenseCategory: DriverLicenseCategory
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export function EditDriverLicenseCategoryForm({ driverLicenseCategory, setIsModalOpen }: EditDriverLicenseCategoryFormProps) {
  const { toast } = useToast()

  const installments = Object.values(driverLicenseCategory.installments)
  const notNullableInstallments = installments.filter(installment => installment !== undefined && installment !== null).length

  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [numberOfInstallments, setNumberOfInstallments] = useState(String(notNullableInstallments))
  const [totalValue, setTotalValue] = useState(driverLicenseCategory.price.toString().replace('€', '').replaceAll(',', ''))
  const [firstInstallment, setFirstInstallment] = useState(driverLicenseCategory.installments.firstInstallment.toString().replace('€', '').replaceAll(',', ''))
  const [secondInstallment, setSecondInstallment] = useState(driverLicenseCategory.installments.secondInstallment.toString().replace('€', '').replaceAll(',', ''))
  const [thirdInstallment, setThirdInstallment] = useState(driverLicenseCategory.installments.thirdInstallment?.toString().replace('€', '').replaceAll(',', '') ?? '')
  const [fourthInstallment, setFourthInstallment] = useState(driverLicenseCategory.installments.fourthInstallment?.toString().replace('€', '').replaceAll(',', '') ?? '')
  const [driverLicenseCategoryName, setDriverLicenseCategoryName] = useState(driverLicenseCategory.name)

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

      await api.put(`/driver-license-category/${driverLicenseCategory.id}`, {
        name: driverLicenseCategoryName,
        price: Number(formattedPrice),
        firstInstallment: Number(formattedFirstInstallment),
        secondInstallment: Number(formattedSecondInstallment),
        thirdInstallment: formattedThirdInstallment && (numberOfInstallments === '3' || numberOfInstallments === '4') ? Number(formattedThirdInstallment) : undefined,
        fourthInstallment: formattedFourthInstallment && numberOfInstallments === '4' ? Number(formattedFourthInstallment) : undefined
      })

      setNumberOfInstallments('')
      setTotalValue('')
      setFirstInstallment('')
      setSecondInstallment('')
      setThirdInstallment('')
      setFourthInstallment('')
      setDriverLicenseCategoryName('')
      setIsModalOpen(false)

      toast({
        title: 'Categoria atualizada!',
        description: 'Categoria atualizada com sucesso!',
      })

      location.reload()
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
      className="flex flex-col items-center justify-center gap-4 mt-14"
    >
      <fieldset className="flex gap-4 w-full">
        <input
          required
          placeholder="Nome da categoria"
          className="w-[14.188rem] outline-none border border-[#C6C6C6] bg-white rounded-lg px-2 py-[0.375rem] text-black"
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
        value={numberOfInstallments}
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
        className={`w-full`}
      />
    </form>
  )
}