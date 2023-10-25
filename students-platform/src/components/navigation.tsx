'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';

import logo from '../assets/tecnica_LOGO.jpg'
import { List, X } from '@phosphor-icons/react';

export function SideBar() {
  const router = useRouter()
  const [isDisabledButton, setIsDisabledButton] = useState(false)

  const [toggleButton, setToggleButton] = useState(false);

  const toggleMenu = () => {
    setToggleButton(!toggleButton);
  };

  function handleLogoutUser() {
    setIsDisabledButton(true)

    const pastDate = new Date(0);
    document.cookie = `user=; expires=${pastDate.toUTCString()}; path=/`;

    router.push('/')

    setIsDisabledButton(false)
  }


  return (
    <>
      <div className='w-full py-2 px-4 md:hidden'>
        <div className='flex justify-between items-center'>
          <Image src={logo} alt='Logo' width={60} height={100}/>
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
              className="w-full py-2 px-4 text-zinc-800 hover:text-[#E86255] text-center flex transition-colors items-center duration-200 ease-out"
            >
              <Link href='/practical-classes' className="w-full hover:text-[#E86255] text-center" >
                Aulas Práticas
              </Link>
            </button>
          </div>
          <div className="group cursor-pointer w-full bg-white rounded-full">
            <button
              className="w-full py-2 px-4 text-zinc-800 hover:text-[#E86255] text-center flex transition-colors duration-200 ease-out"
            >
              <Link href='/theoretical-classes' className="w-full hover:text-[#E86255] text-center" >
                Aulas de Código
              </Link>
            </button>
          </div>
          <div className="group cursor-pointer w-full bg-white rounded-full">
            <button
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
              onClick={() => handleLogoutUser()}
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
          <Image src={logo} alt='Logo' width={40} height={100}/>
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
              <Link href='/info' className={`flex gap-2 hover:text-[#E86255]`} >
              <span className="flex whitespace-nowrap">Informações</span>
              </Link>
            </button>
          </div>
          <div className="group cursor-pointer ml-2">
            <button
              className="w-full py-2 px-4 bg-[#F9F9F9] text-zinc-800 hover:text-[#E86255] text-left flex items-center justify-between transition-colors duration-200 ease-out"
              disabled={isDisabledButton}
              onClick={() => handleLogoutUser()}
            >
              <Link href='/panel/driving-lessons' className={`flex gap-2 hover:text-[#E86255]`} >
              <span className="flex whitespace-nowrap">Sair</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}