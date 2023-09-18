import Image from 'next/image'

import { Clock } from './Clock'

import Logo from '../../../assets/logo.svg'

interface HeaderProps {
  username: string
}

export function Header({ username }: HeaderProps) {
  return (
    <header className='w-screen flex flex-row items-center justify-between py-5 px-20 shadow shadow-black'>
      <Image src={Logo} alt='Imagem do logotipo da app técnica' width={122} />

      <div className='flex flex-row gap-12'>
        <span>{username}</span>
        <Clock />
      </div>
    </header>
  )
}