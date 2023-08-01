import { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ className, ...rest }: TextAreaProps) {
  return (
    <textarea className={`px-5 py-3 w-[18.188rem] outline-none border border-[#C6C6C6] rounded-lg text-black ${className}`} {...rest} />
  )
}