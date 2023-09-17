import Image from 'next/image'

import Logo from '../../assets/logo.svg'

export function Header() {
  return (
    <header className='w-screen flex flex-row items-center justify-between py-5 px-20 shadow shadow-black'>
        <Image src={Logo} alt='Imagem do logotipo da app técnica' width={122} />

        <div className='flex flex-row gap-12'>
          <span>Username</span>
          <div className='flex flex-row gap-5'>
            <span>07/07/2023</span>
            <span>9:41</span>
          </div>
        </div>
      </header>
  )
}