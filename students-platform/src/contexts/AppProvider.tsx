import { ReactNode } from 'react'

import { AuthProvider } from './AuthContext'
import { ReactQueryProvider } from './ReactQueryProvider'
import { SidebarProvider } from './SidebarContext'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </AuthProvider>
    </ReactQueryProvider>
  )
}
