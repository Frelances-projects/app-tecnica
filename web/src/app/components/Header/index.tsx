'use client'
import Image from 'next/image'

import { Clock } from './Clock'

import Logo from '../../../assets/logo.svg'
import { AlignJustify } from 'lucide-react'
import { SideBar } from '../Navigation'
import { User } from '@/utils/interfaces/user'
import { useState } from 'react'

interface HeaderProps {
  user: User
}

export function Header({ user }: HeaderProps) {
  const [openSideBar, setOpenSideBar] = useState(false)

  return (
    <header className="flex w-full items-center justify-between px-4 py-5 shadow shadow-black lg:px-20">
      <Image src={Logo} alt="Imagem do logotipo da app técnica" width={122} />

      <div className="hidden justify-between lg:flex lg:justify-normal lg:gap-12">
        <span>{user?.name}</span>
        <Clock />
      </div>
      <button
        onClick={() => setOpenSideBar(!openSideBar)}
        className={`${
          openSideBar ? 'hidden' : 'flex lg:hidden'
        } hover:text-[#E86255] lg:hidden`}
      >
        <AlignJustify size={28} />
      </button>

      <SideBar
        hasMobile={true}
        setOpenSideBar={setOpenSideBar}
        openSideBar={openSideBar}
        userFunction={user?.function}
      />
    </header>
  )
}
