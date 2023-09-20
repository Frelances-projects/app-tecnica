'use client'
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface EuroInputProps {
  formattedValue: string
  setFormattedValue: Dispatch<SetStateAction<string>>
  placeholder?: string
  required?: boolean
}

export function EuroInput({ placeholder, formattedValue, setFormattedValue, required = true }: EuroInputProps) {
  function handleInputChange (event: ChangeEvent<HTMLInputElement>) {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/[^0-9,.]/g, '');

    const decimalSeparator = inputValue.includes('.') ? '.' : ',';
    const parts = inputValue.split(decimalSeparator);
    if (parts.length > 2) {
      inputValue = parts[0] + decimalSeparator + parts.slice(1).join('');
    }

    setFormattedValue(inputValue);
  };

  return (
    <input
      required={required}
      placeholder={placeholder ?? "Valor total:"}
      className="outline-none border border-[#C6C6C6] bg-white rounded-lg px-2 py-[0.375rem] text-black"
      type="text"
      value={formattedValue}
      onChange={handleInputChange}
    />
  );
}