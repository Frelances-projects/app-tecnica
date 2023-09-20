interface NumberOfInstallmentProps {
  numberOfInstallments: string
}

export function NumberOfInstallment({ numberOfInstallments }: NumberOfInstallmentProps) {
  const currentView = {
    "2":
        <>
          <input placeholder="valor:" className="w-[115px]"/>
          <input placeholder="valor:" className="w-[115px]"/>,
        </>,
    "3":
        <>
          <input placeholder="valor:" className="w-[115px]"/>
          <input placeholder="valor:" className="w-[115px]"/>
          <input placeholder="valor:" className="w-[115px]"/>
        </>,
    "4":
        <>
          <input placeholder="valor:" className="w-[115px]"/>
          <input placeholder="valor:" className="w-[115px]"/>
          <input placeholder="valor:" className="w-[115px]"/>
          <input placeholder="valor:" className="w-[115px]"/>
        </>
  }[numberOfInstallments]

  return <>{currentView}</>
}