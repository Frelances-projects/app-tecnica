import { NavigationButton } from './NavigationButton'

export function Navigation() {
  return (
    <nav className='mt-20 flex items-center justify-center gap-14 mb-20'>
      <NavigationButton href={''} title='Gerir Informações' />
      <NavigationButton href={''} title='Adicionar Aulas Código' />
      <NavigationButton href={''} title='Adicionar Calendário Código' />
      <NavigationButton href={''} title='Gerir Alunos' />
      <NavigationButton href={''} title='Sair' />
    </nav>
  )
}