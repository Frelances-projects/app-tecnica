'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import Image from 'next/image';
import {
  BellDot,
  BellPlus,
  Book,
  Calendar,
  CarIcon,
  ChevronUp,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  LucideClipboardEdit,
  KeySquare,
  LogOut,
  UserPlus2,
  Users2
} from 'lucide-react';

import Logo from '../../assets/Tecnica_LOGO_outline_icon.svg'

interface SideBarProps {
  userFunction: 'ADMIN' | 'DIRECTOR' | 'INSTRUCTOR'
}

export function SideBar({ userFunction }: SideBarProps) {
  const router = useRouter()

  const [collapsed, setCollapsed] = useState(false);
  const [dropDown, setDropDown] = useState<string>('close');
  const [isDisabledButton, setIsDisabledButton] = useState(false)

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  
  const handleDropdownClick = (type: string ) => {
    if(type === dropDown) {
      return setDropDown('close')
    }

    return setDropDown(type)
  };

  function handleLogoutUser() {
    setIsDisabledButton(true)

    const pastDate = new Date(0);
    document.cookie = `user=; expires=${pastDate.toUTCString()}; path=/`;

    router.push('/')

    setIsDisabledButton(false)
  }

  return (
    <div
      className={`sidebar mt-1 h-screen ${collapsed ? 'w-20' : 'w-[360px]'} bg-[#F9F9F9] text-zinc-800 transition-all duration-300`}
    >
      <button
        className="flex gap-4 items-center justify-start overflow-hidden w-full py-3 px-4 bg-[#F9F9F9] text-zinc-800 text-left mt-1 outline-none"
        onClick={toggleCollapse}
      >
        <Image src={Logo} alt='Logo' width={40} height={100}/>
        <span className={`${collapsed ? 'hidden' : 'flex whitespace-nowrap'} transition-all duration-1000`}>
          Grupo Técnica
        </span>
      </button>
      <div className="mt-4 flex flex-col gap-2">
        {(userFunction === 'DIRECTOR' || userFunction === 'ADMIN') && (
          <div className="group cursor-pointer ml-2">
            <button
              className="w-full py-2 px-4 bg-[#F9F9F9] text-zinc-800 hover:text-[#E86255] text-left flex items-center justify-between"
              onClick={() => handleDropdownClick('alert')}
            >
              <div className='flex gap-5 items-center'>
                <BellDot size={20} />
                <span className={`${collapsed ? 'hidden' : 'flex whitespace-nowrap'}`}>
                  Gerir Alertas
                </span>
              </div>
              <ChevronUp className={`transform transition-all duration-300 ${dropDown === 'alert'  ? 'rotate-180' : 'rotate-90'} transition-all duration-300`} />
            </button>
            <div className={`transform flex flex-col gap-4 ml-10 mt-2 ${collapsed ? 'ml-6' : ''} ${dropDown === 'alert' ? 'h-max' : 'hidden'} transition-all ease-linear duration-300`} >
              <Link href='/panel/alert/create' className={`flex gap-2 hover:text-[#E86255]`} >
                <BellPlus size={20} /> <span className={`${collapsed ? 'hidden' : ''}`}>Criar Alerta</span>
              </Link>
              <Link href='/panel/alert/list' className={`flex gap-2 hover:text-[#E86255]`}>
                <BellDot size={20} /> <span className={`${collapsed ? 'hidden' : ''}`}>Informações</span>
              </Link>
            </div>
          </div>
        )}

        {(userFunction === 'DIRECTOR' || userFunction === 'ADMIN') && (
          <div className="group cursor-pointer ml-2">
            <button
              className="w-full py-2 px-4 bg-[#F9F9F9] text-zinc-800 hover:text-[#E86255] text-left flex items-center justify-between"
            >
              <Link href='/panel/create-code-calendar' className={`flex gap-2 hover:text-[#E86255]`} >
                <Calendar size={20} /> <span className={`${collapsed ? 'hidden' : 'flex whitespace-nowrap'}`}>Adicionar Calendário Código</span>
              </Link>
            </button>
          </div>
        )}

        {(userFunction === 'DIRECTOR' || userFunction === 'ADMIN') && (
          <div className="group cursor-pointer ml-2">
            <button
              className="w-full py-2 px-4 bg-[#F9F9F9] text-zinc-800 hover:text-[#E86255] text-left flex items-center justify-between"
              onClick={() => handleDropdownClick('student')}
            >
              <div className='flex gap-5 items-center'>
                <Users2 size={20} />
                <span className={`${collapsed ? 'hidden' : 'flex whitespace-nowrap'}`}>
                  Gerir Alunos
                </span>
              </div>
              <ChevronUp className={`transform ${dropDown === 'student' ? 'rotate-180' : 'rotate-90'} ${collapsed ? 'hidden' : ''} transition-all duration-300`} />
            </button>
            <div className={`transform flex flex-col gap-4 ml-10 mt-2 ${collapsed  ? 'ml-6' : ''} ${dropDown === 'student' ? 'h-max' : 'hidden'} transition-all ease-linear duration-300`}>
              <Link href='/panel/students/list' className='flex gap-2 hover:text-[#E86255]'>
                <ClipboardList size={20} /> <span className={`${collapsed ? 'hidden' : ''}`}>Listagem dos Alunos</span>   
              </Link>
              <Link href='/panel/students/register' className='flex gap-2 hover:text-[#E86255]'>
                <UserPlus2 size={20} /> <span className={`${collapsed ? 'hidden' : ''}`}>Adicionar Alunos</span>
              </Link>
            </div>
          </div>
        )}

        <div className="group cursor-pointer ml-2">
          <button
            className="w-full py-2 px-4 bg-[#F9F9F9] text-zinc-800 hover:text-[#E86255] text-left flex items-center justify-between"
          >
            <Link href='/panel/driving-lessons' className={`flex gap-2 hover:text-[#E86255]`} >
              <CarIcon size={20} /> <span className={`${collapsed ? 'hidden' : 'flex whitespace-nowrap'}`} >Aulas Condução</span>
            </Link>
          </button>
        </div>

        <div className="group cursor-pointer ml-2">
          <button
            className="w-full py-2 px-4 bg-[#F9F9F9] text-zinc-800 hover:text-[#E86255] text-left flex items-center justify-between"
            onClick={() => handleDropdownClick('exam')}
          >
            <div className='flex gap-5 items-center'>
              <ClipboardCheck size={20} />
              <span className={`${collapsed ? 'hidden' : 'flex whitespace-nowrap'}`}>
                Exames
              </span>
            </div>
            <ChevronUp className={`transform ${dropDown === 'exam' ? 'rotate-180' : 'rotate-90'} ${collapsed ? 'hidden' : ''} transition-all duration-300`} />
          </button>
          <div className={`transform flex flex-col gap-4 ml-10 mt-2 ${collapsed ? 'ml-6' : ''} ${dropDown === 'exam' ? 'h-max' : 'hidden'} transition-all ease-linear duration-300`}>
            <Link href='/panel/code-exams' className='flex gap-2 hover:text-[#E86255]'>
              <Book size={20} /> <span className={`${collapsed ? 'hidden' : ''}`}>Código</span>
            </Link>
            <Link href='/panel/driving-exams' className='flex gap-2 hover:text-[#E86255]'>
              <KeySquare size={20} /> <span className={`${collapsed ? 'hidden' : ''}`}>Condução</span>
            </Link>
          </div>
        </div>

        {(userFunction === 'DIRECTOR' || userFunction === 'ADMIN') && (
          <div className="group cursor-pointer ml-2">
            <button
              className="w-full py-2 px-4 bg-[#F9F9F9] text-zinc-800 hover:text-[#E86255] text-left flex items-center justify-between"
              onClick={() => handleDropdownClick('prices')}
            >
              <div className='flex gap-5 items-center'>
                <ClipboardCheck size={20} />
                <span className={`${collapsed ? 'hidden' : 'flex whitespace-nowrap'}`}>
                Preços
                </span>
              </div>
              <ChevronUp className={`transform ${dropDown === 'prices' ? 'rotate-180' : 'rotate-90'} ${collapsed ? 'hidden' : ''} transition-all duration-300`} />
            </button>

            <div className={`transform flex flex-col gap-4 ml-10 mt-2 ${collapsed ? 'ml-6' : ''} ${dropDown === 'prices' ? 'h-max' : 'hidden'} transition-all ease-linear duration-300`}>
              <Link href='/panel/prices/register' className='flex gap-2 hover:text-[#E86255]'>
                <CreditCard size={20} /> <span className={`${collapsed ? 'hidden' : ''}`}>Definir Preços</span>
              </Link>
              
              <Link href='/panel/prices/list' className='flex gap-2 hover:text-[#E86255]'>
                <LucideClipboardEdit size={20} /> <span className={`${collapsed ? 'hidden' : ''}`}>Listagem dos preços</span>
              </Link>
            </div>
          </div>
        )}

        <div className="group cursor-pointer ml-2">
          <button
            disabled={isDisabledButton}
            onClick={() => handleLogoutUser()}
            className="w-full py-2 px-4 bg-[#F9F9F9] text-zinc-800 enabled:hover:text-[#E86255] text-left flex items-center justify-between disabled:cursor-not-allowed"
          >
            <div className='flex gap-5 items-center'>
              <LogOut size={20} />
              <span className={`${collapsed ? 'hidden' : 'flex whitespace-nowrap'}`}>
                Sair
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}