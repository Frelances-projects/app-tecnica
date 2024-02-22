/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes, forwardRef } from 'react'

type InputInformationProps = InputHTMLAttributes<HTMLInputElement>

export const InputModal = forwardRef(
  ({ ...rest }: InputInformationProps, ref) => {
    return (
      <input
        className="flex w-full items-center justify-between rounded-lg border border-[#C6C6C6] bg-white px-2 py-[0.375rem] text-black outline-none"
        {...rest}
        ref={ref as any}
      />
    )
  },
)

InputModal.displayName = 'InputModal'
