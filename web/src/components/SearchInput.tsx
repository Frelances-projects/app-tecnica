import { Dispatch, ReactNode, SetStateAction } from "react";

import { Input } from "@/components/Input";

interface SearchInput {
  setInputValue: Dispatch<SetStateAction<string>>
  placeholder?: string
  className?: string
  type?: string
  children?: ReactNode
}

export function SearchInput(
  { 
    setInputValue,
    placeholder = 'Nome X',
    className,
    children,
    type = "text"
  }: SearchInput) {
  return (
    <div  className="w-full flex gap-8 mb-11">
      <Input 
        id='search'
        placeholder={placeholder}
        type={type}
        name='search_name'
        onChange={(e) => setInputValue(e?.target?.value)} 
        className={className}
      />
      {children}
    </div>
  )
}