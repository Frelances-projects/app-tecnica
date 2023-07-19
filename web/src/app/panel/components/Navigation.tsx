import Link from 'next/link'

export function Navigation() {
  return (
    <nav className='mt-20 flex items-center justify-center gap-14 mb-20'>
      <Link href={''} className='w-48 h-44 py-14 px-8 bg-[#D9D9D9] text-black text-xl text-center'>Gerir <br/> Informações</Link>
      <Link href={''} className='w-48 h-44 pt-12 pb-14 px-8 bg-[#D9D9D9] text-black text-xl text-center'>Adicionar<br/>Aulas <br/>Código</Link>
      <Link href={''} className='w-48 h-44 pt-12 pb-14 px-8 bg-[#D9D9D9] text-black text-xl text-center'>Adicionar <br/> Calendário <br/> Código</Link>
      <Link href={''} className='w-48 h-44 py-14 px-8 bg-[#D9D9D9] text-black text-xl text-center'>Gerir <br/> Alunos</Link>
      <Link href={''} className='w-48 h-44 pt-16 pb-14 px-8 bg-[#D9D9D9] text-black text-xl text-center'>Sair</Link>
    </nav>
  )
}