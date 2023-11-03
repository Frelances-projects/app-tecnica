import { InputHTMLAttributes, forwardRef } from "react";

interface InputInformationProps extends InputHTMLAttributes<HTMLInputElement> {}

export const InputModal = forwardRef(({ ...rest }: InputInformationProps, ref) => {
  return (
    <input
      className="border w-full border-[#C6C6C6] outline-none flex items-center justify-between bg-white rounded-lg px-2 py-[0.375rem] text-black"
      {...rest}
      ref={ref as any}
    />
  )
})

InputModal.displayName = 'InputModal'