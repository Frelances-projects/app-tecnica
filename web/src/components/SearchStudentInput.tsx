import { Dispatch, SetStateAction } from "react";

import { Input } from "@/components/Input";

interface SearchStudentInput {
  setInputValue: Dispatch<SetStateAction<string>>
}

export function SearchStudentInput({setInputValue}: SearchStudentInput) {
  return (
    <div  className="w-full flex gap-8 mb-11">
      <Input id='search' placeholder="Nome X" type='text' name='search_name' onChange={(e) => setInputValue(e?.target?.value)} />
    </div>
  )
}