import { ReactNode } from 'react'

interface WrapperItemProps {
  children: ReactNode
  htmlFor: string
  label: string
  classNameLabel?: string
}

export function WrapperItem({
  children,
  label,
  htmlFor,
  classNameLabel,
}: WrapperItemProps) {
  return (
    <fieldset className={`flex justify-between`}>
      <label htmlFor={htmlFor} className={classNameLabel}>
        {label}
      </label>
      {children}
    </fieldset>
  )
}
