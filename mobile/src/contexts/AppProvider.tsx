import { ReactNode } from 'react'

import { AuthProvider } from './AuthContext'
import { ReactQueryProvider } from './ReactQueryProvider'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ReactQueryProvider>
  )
}
