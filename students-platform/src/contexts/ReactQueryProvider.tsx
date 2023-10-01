import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '@/lib/react-query'

type ReactQueryProviderProps = {
  children: ReactNode
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
