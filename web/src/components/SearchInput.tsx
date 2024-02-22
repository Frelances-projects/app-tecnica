import { Dispatch, ReactNode, SetStateAction } from 'react'

import { Input } from '@/components/Input'

interface SearchInput {
  setInputValue: Dispatch<SetStateAction<string>>
  placeholder?: string
  className?: string
  type?: string
  children?: ReactNode
}

export function SearchInput({
  setInputValue,
  placeholder = 'Nome X',
  className,
  children,
  type = 'text',
}: SearchInput) {
  return (
    <div className="mb-11 flex w-full flex-col gap-4 sm:flex-row sm:gap-8">
      <Input
        id="search"
        placeholder={placeholder}
        type={type}
        name="search_name"
        onChange={(e) => setInputValue(e?.target?.value)}
        className={className}
      />
      {children}
    </div>
  )
}
