import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { List, X } from '@phosphor-icons/react';

import { useAuth } from '@/hooks/useAuth';
import { useSidebar } from '@/hooks/useSidebar';

import logo from '../../public/logo.svg'

export function SideBar() {
  const [isDisabledButton, setIsDisabledButton] = useState(false)

  const { toggleButton, setToggleButton } = useSidebar()

  const { logout } = useAuth()

  const toggleMenu = () => {
    setToggleButton(!toggleButton);
  };


  return (
    <>
      <div className='w-full h-full py-2 px-4 md:hidden'>
        <div className='flex justify-between items-center'>
          <Image src={logo} alt='Logo' width={180} height={280}/>
          <button onClick={toggleMenu}>
            <List size={24} weight='bold'/>
          </button>
        </div>

        <div className={`${toggleButton ? 'flex' : 'hidden'} bg-[#F01E2C] z-10 pt-10 absolute top-0 left-0 h-screen w-full flex flex-col gap-4 items-center px-10 md:hidden`}>
          <button onClick={toggleMenu} className='ml-auto mb-10 -mt-8 -mr-6 text-white'>
            <X size={24} weight='bold'/>
          </button>

          <div className="group cursor-pointer w-full bg-white rounded-full">
            <button
              onClick={toggleMenu}
              className="w-full py-2 px-4 text-zinc-800 hover:text-[#E86255] text-center flex transition-colors items-center duration-200 ease-out"
            >
              <Link href='/practical-classes' className="w-full hover:text-[#E86255] text-center" >
                Aulas Práticas
              </Link>
            </button>
          </div>

          <div className="group cursor-pointer w-full bg-white rounded-full">
            <button
              onClick={toggleMenu}
              className="w-full py-2 px-4 text-zinc-800 hover:text-[#E86255] text-center flex transition-colors duration-200 ease-out"
            >
              <Link href='/theoretical-classes' className="w-full hover:text-[#E86255] text-center" >
                Aulas de Código
              </Link>
            </button>
          </div>

          <div className="group cursor-pointer w-full bg-white rounded-full">
            <button
              onClick={toggleMenu}
              className="w-full py-2 px-4 text-zinc-800 hover:text-[#E86255] text-center flex transition-colors items-center duration-200 ease-out"
            >
              <Link href='/calendar' className="w-full hover:text-[#E86255] text-center" >
                Calendário de aulas
              </Link>
            </button>
          </div>

          <div className="group cursor-pointer w-full bg-white rounded-full">
            <button
              onClick={toggleMenu}
              className="w-full py-2 px-4 text-zinc-800 hover:text-[#E86255] text-center flex transition-colors duration-200 ease-out"
            >
              <Link href='/info' className="w-full hover:text-[#E86255] text-center" >
                Informações
              </Link>
            </button>
          </div>

          <div className="group cursor-pointer w-full bg-white rounded-full">
            <button
              className="w-full py-2 px-4 text-zinc-800 hover:text-[#E86255] text-center transition-colors duration-200 ease-out"
              disabled={isDisabledButton}
              onClick={() => logout()}
            >
                Sair
            </button>
          </div>
        </div>
      </div>

      <div
        className="sidebar hidden h-screen w-[360px] bg-[#F9F9F9] text-zinc-800 transition-all duration-300 md:flex md:flex-col">
        <button
          className="flex gap-4 items-center justify-start overflow-hidden w-full py-3 px-4 bg-[#F9F9F9] text-zinc-800 text-left mt-1 outline-none"
        >
          <Image src={logo} alt='Logo' width={90} height={180}/>
          <span className="flex whitespace-nowrap">
            Grupo Técnica
          </span>
        </button>

        <div className="mt-4 flex flex-col gap-2">
          <div className="group cursor-pointer ml-2">
            <button
              className="w-full py-2 px-4 bg-[#F9F9F9] text-zinc-800 hover:text-[#E86255] text-left flex items-center justify-between transition-colors duration-200 ease-out"
            >
              <Link href='/practical-classes' className={`flex gap-2 hover:text-[#E86255]`} >
              <span className="flex whitespace-nowrap">Aulas Práticas</span>
              </Link>
            </button>
          </div>

          <div className="group cursor-pointer ml-2">
            <button
              className="w-full py-2 px-4 bg-[#F9F9F9] text-zinc-800 hover:text-[#E86255] text-left flex items-center justify-between transition-colors duration-200 ease-out"
            >
              <Link href='/theoretical-classes' className={`flex gap-2 hover:text-[#E86255]`} >
              <span className="flex whitespace-nowrap">Aulas de Código</span>
              </Link>
            </button>
          </div>

          <div className="group cursor-pointer ml-2">
            <button
              className="w-full py-2 px-4 bg-[#F9F9F9] text-zinc-800 hover:text-[#E86255] text-left flex items-center justify-between transition-colors duration-200 ease-out"
            >
              <Link href='/calendar' className={`flex gap-2 hover:text-[#E86255]`} >
                <span className="flex whitespace-nowrap">Calendário de aulas</span>
              </Link>
            </button>
          </div>

          <div className="group cursor-pointer ml-2">
            <button
              className="w-full py-2 px-4 bg-[#F9F9F9] text-zinc-800 hover:text-[#E86255] text-left flex items-center justify-between transition-colors duration-200 ease-out"
            >
              <Link href='/info' className={`flex gap-2 hover:text-[#E86255]`} >
                <span className="flex whitespace-nowrap">Informações</span>
              </Link>
            </button>
          </div>

          <div className="group cursor-pointer ml-2">
            <button
              className="w-full py-2 px-4 bg-[#F9F9F9] text-zinc-800 hover:text-[#E86255] text-left flex items-center justify-between transition-colors duration-200 ease-out"
              disabled={isDisabledButton}
              onClick={() => logout()}
            >
              
              <span className="flex whitespace-nowrap">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}