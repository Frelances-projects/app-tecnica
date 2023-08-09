'use client'

import { usePathname } from 'next/navigation';

import { NavigationButton } from './NavigationButton'

export function Navigation() {
  const pathname = usePathname();
  
  return (
    <nav className='mt-20 flex items-center justify-center gap-14 mb-20'>
      <NavigationButton href={'/panel/'} title='Gerir Informações' isActive={pathname === '/panel' ? true : false} />
      <NavigationButton href={'/panel/create-classes'} title='Adicionar Aulas Código' isActive={pathname === '/panel/create-classes' ? true : false} />
      <NavigationButton href={'/panel/create-code-calendar'} title='Adicionar Calendário Código' isActive={pathname === '/panel/create-code-calendar' ? true : false} />
      <NavigationButton href={'/panel/manage-students'} title='Gerir Alunos' isActive={pathname === '/panel/manage-students' ? true : false} />
      <NavigationButton href={'/'} title='Sair' isActive={false} />
    </nav>
  )
}