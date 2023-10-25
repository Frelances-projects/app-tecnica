interface DefaultButtonProps extends HTMLButtonElement {
  title: string
}

export function DefaultButton({ title }: DefaultButtonProps) {
  return (
    <button
      className="h-11 w-60 items-center justify-center rounded-[22.5px] bg-primary-500"
    >
      {title}
    </button>
  )
}
