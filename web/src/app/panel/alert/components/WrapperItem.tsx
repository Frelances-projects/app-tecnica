import { ReactNode } from "react"

interface WrapperItemProps {
  children: ReactNode
  htmlFor: string
  label: string
}

export function WrapperItem({ children, label, htmlFor }: WrapperItemProps) {
  return (
    <fieldset className='flex justify-between'>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </fieldset>
  )
}