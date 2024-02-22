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
    <fieldset
      className={`flex flex-col gap-1 lg:flex-row lg:justify-between lg:gap-0`}
    >
      <label htmlFor={htmlFor} className={classNameLabel}>
        {label}
      </label>
      {children}
    </fieldset>
  )
}
