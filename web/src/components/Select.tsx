import { InputHTMLAttributes } from "react"

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement> {
  placeHolder?: string
  data?: {value: string, label: string}[]
}

export function Select({data, className, placeHolder, ...rest}: SelectProps) {

  const dataTeste = data
  return (
    <select className={`bg-white border border-[#C6C6C6] outline-none rounded-lg w-[18.188rem] px-2 py-[0.375rem] text-black ${className}`}  {...rest}>
      <option className="text-gray" value="" disabled selected>{placeHolder ?? 'Selecione...'}</option>
      {dataTeste?.map((option) => {
        return <option className="text-gray" key={option?.value} value={option?.value} >{option?.label}</option>
      })}
    </select>
  )
}