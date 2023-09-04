import { ReactNode } from 'react'
import { TamaguiProvider } from 'tamagui'

import { AuthProvider } from './AuthContext'
import { ReactQueryProvider } from './ReactQueryProvider'
import config from '../../tamagui.config'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <TamaguiProvider config={config}>
      <ReactQueryProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ReactQueryProvider>
    </TamaguiProvider>
  )
}
