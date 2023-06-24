import { ReactNode, createContext } from 'react'

export type AuthContextDataProps = {}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthProvider({ children }: AuthContextProviderProps) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
