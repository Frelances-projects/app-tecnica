import { Dispatch, SetStateAction } from "react";

import { Input } from "@/components/Input";

interface SearchInput {
  setInputValue: Dispatch<SetStateAction<string>>
  placeholder?: string
}

export function SearchInput({ setInputValue, placeholder = 'Nome X' }: SearchInput) {
  return (
    <div  className="w-full flex gap-8 mb-11">
      <Input 
        id='search'
        placeholder={placeholder}
        type='text'
        name='search_name'
        onChange={(e) => setInputValue(e?.target?.value)} 
      />
    </div>
  )
}