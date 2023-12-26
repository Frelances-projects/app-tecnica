import { TextareaHTMLAttributes } from 'react'

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextArea({ className, ...rest }: TextAreaProps) {
  return (
    <textarea
      className={`w-[18.188rem] rounded-lg border border-[#C6C6C6] px-5 py-3 text-black outline-none ${className}`}
      {...rest}
    />
  )
}
