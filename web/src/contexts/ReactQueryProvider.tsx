'use client'
import { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

interface ReactQueryProviderProps {
  children: ReactNode
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}