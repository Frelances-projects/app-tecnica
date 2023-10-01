import { ReactNode } from 'react'

import { ReactQueryProvider } from './ReactQueryProvider'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ReactQueryProvider>
      {children}
    </ReactQueryProvider>
  )
}
