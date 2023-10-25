import { CheckCircle, XCircle } from "@phosphor-icons/react"

interface PracticalClassItemProps {
  date: string
  title: string
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED'
}

export function PracticalClassItem({ title, date, status }: PracticalClassItemProps) {
  return (
    <div className="mb-3 flex-row gap-x-5 text-black items-center font-regular text-sm">
      <span>{date}</span>
      <h1>{title}</h1>
      {
        status === 'COMPLETED' ? 
          <CheckCircle size={24} color="#00A300" weight="fill" /> 
          : 
          <XCircle size={24} color="#CC0000" weight="fill" />
        }
    </div>
  )
}