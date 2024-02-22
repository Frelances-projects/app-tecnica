/* eslint-disable jsx-a11y/role-has-required-aria-props */
'use client'

import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './command'

import { Popover, PopoverContent, PopoverTrigger } from './popover'

export interface dataType {
  value: string
  label: string
  number?: string
}

interface ComboboxProps {
  data: dataType[] | undefined
  onSelect: (value: string) => void
  placeholder: string
  inputPlaceholder?: string
  defaultItem?: boolean
  defaultValue?: string
  emptyHeading: string
}

export function Combobox({
  data,
  placeholder,
  inputPlaceholder,
  onSelect,
  defaultItem = false,
  defaultValue,
  emptyHeading,
}: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  const dataWithAllOption = data
    ? [{ label: 'Todos', value: 'all' }, ...data]
    : []

  const newData = defaultItem ? dataWithAllOption : data

  function handleOnSelect(currentValue: string) {
    let selectedValue

    if (newData && newData[0].number) {
      selectedValue = newData?.find(
        (item) => item.number?.toLowerCase() === currentValue.toLowerCase(),
      )?.value
    } else {
      selectedValue = newData?.find(
        (item) => item.label.toLowerCase() === currentValue.toLowerCase(),
      )?.value
    }

    setValue(selectedValue!)
    onSelect(selectedValue!)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-expanded={open}
          className="border-dark-700 text-dark-700 relative flex w-full items-center justify-between truncate rounded-lg border border-[#C6C6C6] bg-white px-2 py-[0.375rem] outline-none focus:border-primary disabled:cursor-not-allowed disabled:border-red-500 disabled:text-red-600"
        >
          <span className="truncate">
            {value
              ? newData?.find((item) => item.value === value)?.label
              : placeholder}
          </span>

          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command defaultValue={defaultValue} className="pointer-events-auto">
          <CommandInput
            className=""
            placeholder={inputPlaceholder ?? placeholder}
          />
          <CommandEmpty>{emptyHeading}</CommandEmpty>
          <CommandGroup>
            {newData?.map((item) => (
              <CommandItem
                key={item.value}
                value={item.number ?? item.label}
                onSelect={(currentValue) => handleOnSelect(currentValue)}
              >
                <Check
                  className={clsx(
                    'mr-2 h-4 w-4',
                    value === item.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
