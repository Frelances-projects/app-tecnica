import { useContext } from 'react'

import { SidebarContext } from '@/contexts/SidebarContext'

export function useSidebar() {
  const context = useContext(SidebarContext)

  return context
}
