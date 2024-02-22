'use client'
import { FormEvent, useState } from 'react'
import { revalidatePath } from 'next/cache'
import { EuroIcon, X } from 'lucide-react'
import { AxiosError } from 'axios'

import { api } from '@/lib/api'

import { Button } from '@/components/Button'
import { Select } from '@/components/Select'
import { NumberOfInstallment } from './NumberOfInstallment'
import { EuroInput } from './EuroInput'
import { useToast } from '@/components/ui/use-toast'

interface CreatePricesFormProps {
  schools: {
    label: string
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
  const [vehicle, setVehicle] = useState('')
  const [vehicles, setVehicles] = useState<string[]>([])

  const installment = [
    { value: '2', label: 'Em 2x' },
    { value: '3', label: 'Em 3x' },
    { value: '4', label: 'Em 4x' },
  ]

  function handleAddVehicle() {
    if (vehicles.includes(vehicle)) {
      return
    }

    setVehicles((state) => [...state, vehicle.trim()])
    setVehicle('')
  }

  async function handleCreateDriverLicenseCategory(event: FormEvent) {
    try {
      setIsButtonDisabled(true)
      event.preventDefault()
      if (vehicles.length === 0) {
        return toast({
          title: 'Adicione pelo menos um veículo!',
          description: 'A categoria deve conter pelo menos um veículo',
          variant: 'destructive',
        })
      }

      const formattedPrice = totalValue.replace(',', '.')
      const formattedFirstInstallment = firstInstallment.replace(',', '.')
      const formattedSecondInstallment = secondInstallment.replace(',', '.')
      const formattedThirdInstallment =
        thirdInstallment.trim() === ''
          ? undefined
          : thirdInstallment.replace(',', '.')
      const formattedFourthInstallment =
        fourthInstallment.trim() === ''
          ? undefined
          : fourthInstallment.replace(',', '.')

      await api.post(`/driver-license-category`, {
        name: driverLicenseCategoryName,
        price: Number(formattedPrice),
        schoolId: selectSchool,
        vehicles,
        firstInstallment: Number(formattedFirstInstallment),
        secondInstallment: Number(formattedSecondInstallment),
        thirdInstallment: formattedThirdInstallment,
        fourthInstallment: formattedFourthInstallment,
      })

      setNumberOfInstallments('')
      setTotalValue('')
      setFirstInstallment('')
      setSecondInstallment('')
      setThirdInstallment('')
      setFourthInstallment('')
      setDriverLicenseCategoryName('')
      setSelectSchool('')
      setVehicles([])

      toast({
        title: 'Categoria cadastrada!',
        description: 'Categoria cadastrada com sucesso!',
      })

      revalidatePath('/panel/students/register')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: 'Error!',
          description:
            'Ocorreu um erro no servidor! Por favor tente novamente mais tarde',
          variant: 'destructive',
        })
      }
    } finally {
      setIsButtonDisabled(false)
    }
  }

  return (
    <form
      onSubmit={handleCreateDriverLicenseCategory}
      className="mt-14 flex flex-col gap-4 md:max-w-[290px]"
    >
      <Select
        placeHolder="Definir Escola"
        required
        data={schools}
        value={selectSchool}
        onChange={(event) => setSelectSchool(event.target.value)}
      />

      <fieldset className="flex w-full flex-col gap-4 sm:flex-row">
        <input
          required
          placeholder="Nome da categoria"
          className="w-full rounded-lg border border-[#C6C6C6] bg-white px-2 py-[0.375rem] text-black outline-none md:w-[18.188rem]"
          type="text"
          value={driverLicenseCategoryName}
          onChange={(event) => setDriverLicenseCategoryName(event.target.value)}
        />

        <div className="flex w-full items-center justify-center gap-1">
          <EuroInput
            formattedValue={totalValue}
            setFormattedValue={setTotalValue}
          />
          <EuroIcon size={22} />
        </div>
      </fieldset>

      <fieldset className="flex w-full flex-col gap-4 sm:flex-row">
        <input
          placeholder="Veículos da categoria"
          className="w-full rounded-lg border border-[#C6C6C6] bg-white px-2 py-[0.375rem] text-black outline-none md:w-[18.188rem]"
          type="text"
          value={vehicle}
          onChange={(event) => setVehicle(event.target.value)}
        />

        <Button
          title="Adicionar veículo"
          onClick={handleAddVehicle}
          disabled={vehicle.trim() === ''}
          type="button"
          className={`w-full md:w-48`}
        />
      </fieldset>

      <div className="flex items-center gap-5">
        {vehicles.map((vehicle) => (
          <span
            key={vehicle}
            className="flex items-center justify-center truncate rounded-sm bg-slate-100 px-2 py-1 font-medium text-slate-900"
          >
            {vehicle}
            <button
              onClick={() =>
                setVehicles((state) =>
                  state.filter((vehicleState) => vehicleState !== vehicle),
                )
              }
              className="ml-1 rounded-full border border-slate-300 p-1"
            >
              <X size={14} color="black" />
            </button>
          </span>
        ))}
      </div>

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
