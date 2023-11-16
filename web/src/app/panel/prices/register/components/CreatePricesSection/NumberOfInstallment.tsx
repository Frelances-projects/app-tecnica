'use client'
import { Dispatch, SetStateAction } from "react"

import { EuroInput } from "./EuroInput"

interface NumberOfInstallmentProps {
  numberOfInstallments: string
  firstInstallment: string
  setFirstInstallment: Dispatch<SetStateAction<string>>
  secondInstallment: string
  setSecondInstallment: Dispatch<SetStateAction<string>>
  thirdInstallment: string
  setThirdInstallment: Dispatch<SetStateAction<string>>
  fourthInstallment: string
  setFourthInstallment: Dispatch<SetStateAction<string>>
}

export function NumberOfInstallment({ 
  numberOfInstallments,
  firstInstallment,
  setFirstInstallment,
  secondInstallment,
  setSecondInstallment,
  thirdInstallment,
  setThirdInstallment,
  fourthInstallment,
  setFourthInstallment
}: NumberOfInstallmentProps) {
  const currentView = {
    "2":
        <>
          <EuroInput
            placeholder="Valor:"
            formattedValue={firstInstallment}
            setFormattedValue={setFirstInstallment}
          />
          <EuroInput
            placeholder="Valor:"
            formattedValue={secondInstallment}
            setFormattedValue={setSecondInstallment}
          />
        </>,
    "3": 
        <>
          <EuroInput
            placeholder="Valor:"
            formattedValue={firstInstallment}
            setFormattedValue={setFirstInstallment}
          />
          <EuroInput
            placeholder="Valor:"
            formattedValue={secondInstallment}
            setFormattedValue={setSecondInstallment}
          />
          <EuroInput
            placeholder="Valor:"
            required={false}
            formattedValue={thirdInstallment}
            setFormattedValue={setThirdInstallment}
          />
        </>,
    "4":
        <>
          <EuroInput
            placeholder="Valor:"
            formattedValue={firstInstallment}
            setFormattedValue={setFirstInstallment}
          />
          <EuroInput
            placeholder="Valor:"
            formattedValue={secondInstallment}
            setFormattedValue={setSecondInstallment}
          />
          <EuroInput
            placeholder="Valor:"
            required={false}
            formattedValue={thirdInstallment}
            setFormattedValue={setThirdInstallment}
          />
          <EuroInput
            placeholder="Valor:"
            required={false}
            formattedValue={fourthInstallment}
            setFormattedValue={setFourthInstallment}
          />
        </>
  }[numberOfInstallments]

  return <>{currentView}</>
}