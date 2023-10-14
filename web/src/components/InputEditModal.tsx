import { InputHTMLAttributes } from "react";

interface InputEditInformationProps extends InputHTMLAttributes<HTMLInputElement> {}

export function InputEditModal({ ...rest }: InputEditInformationProps) {
  return (
    <input
      className="border w-full border-[#C6C6C6] outline-none flex items-center justify-between bg-white rounded-lg px-2 py-[0.375rem] text-black"
      {...rest}
    />
  )
}