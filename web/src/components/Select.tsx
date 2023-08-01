'use client'

import { CaretDown } from '@phosphor-icons/react'
import { SelectProps } from '@radix-ui/react-select'
import * as Select from '@radix-ui/react-select'

interface SelectComponentProps extends SelectProps {
  placeHolder: string
  className?: string
  data: any
}

export function SelectComponent({ className, placeHolder, ...rest }: SelectComponentProps) {
  return (
    <Select.Root {...rest}>
    <Select.Trigger className={`flex px-5 items-center py-2 text-xs w-[18.188rem] border border-[#C6C6C6] rounded-lg text-black ${className}`}>
      {placeHolder}
      <CaretDown className='ml-auto text-[#C6C6C6]' weight='bold' size={20}/>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content>
        <Select.ScrollUpButton />
        <Select.Viewport>
          

        </Select.Viewport>
        <Select.Arrow />
      </Select.Content>
    </Select.Portal>
  </Select.Root>
  )
}