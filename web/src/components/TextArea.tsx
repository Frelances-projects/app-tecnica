import { TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ className, ...rest }: TextAreaProps) {
  return (
    <textarea className={`px-5 py-3 w-[18.188rem] h-[11.438rem] rounded-lg text-center text-black ${className}`} {...rest} />
  )
}