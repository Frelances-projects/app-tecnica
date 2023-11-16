import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useState } from 'react'

export type SidebarContextDataProps = {
  toggleButton: boolean
  setToggleButton: Dispatch<SetStateAction<boolean>>
}

type SidebarContextProviderProps = {
  children: ReactNode
}

export const SidebarContext = createContext<SidebarContextDataProps>(
  {} as SidebarContextDataProps,
)

export function SidebarProvider({ children }: SidebarContextProviderProps) {
  const [toggleButton, setToggleButton] = useState(false);

  return <SidebarContext.Provider value={{
    toggleButton,
    setToggleButton
  }}>{children}</SidebarContext.Provider>
}
