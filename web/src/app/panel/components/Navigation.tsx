import { headers } from "next/headers";

import { NavigationButton } from './NavigationButton'

export function Navigation() {
  const headersList = headers();
  const activePath = headersList.get("x-invoke-path");

  // const pathname = usePathname(); o headers é para quando o componente é gerado pelo lado do servidor se apresentar falhas utilizar o hook usePathname e colocar o 'use client nesse componente'
  
  return (
    <nav className='mt-20 flex items-center justify-center gap-14 mb-20'>
      <NavigationButton href={'/panel/'} title='Gerir Informações' isActive={activePath === '/panel' ? true : false} />
      <NavigationButton href={'/panel/create-classes'} title='Adicionar Aulas Código' isActive={activePath === '/panel/create-classes' ? true : false} />
      <NavigationButton href={'/panel/create-code-calendar'} title='Adicionar Calendário Código' isActive={activePath === '/panel/create-code-calendar' ? true : false} />
      <NavigationButton href={'/panel/manage-students'} title='Gerir Alunos' isActive={activePath === '/panel/manage-students' ? true : false} />
      <NavigationButton href={'/'} title='Sair' isActive={false} />
    </nav>
  )
}