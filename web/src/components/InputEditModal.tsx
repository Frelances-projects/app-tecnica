import { InputHTMLAttributes, forwardRef } from "react";

interface InputEditInformationProps extends InputHTMLAttributes<HTMLInputElement> {}

export const InputEditModal = forwardRef(({ ...rest }: InputEditInformationProps, ref) => {
  return (
    <input
      className="border w-full border-[#C6C6C6] outline-none flex items-center justify-between bg-white rounded-lg px-2 py-[0.375rem] text-black"
      {...rest}
      ref={ref as any}
    />
  )
})

InputEditModal.displayName = 'InputEditModal'