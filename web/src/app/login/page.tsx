import Image from 'next/image'
import Link from 'next/link';
import { UserSquare, Lock } from 'lucide-react';

import Logo from '../../assets/logo.svg'

export default function Login() {
  return (
    <main className="w-full max-w-7xl mx-auto flex min-h-screen flex-col items-center justify-center p-24 gap-36">
      <Image src={Logo} alt='Imagem do logotipo da app técnica' />

      <div className='flex flex-col items-center justify-between gap-9'>
        <div className='flex flex-row items-center justify-between rounded-[44px] bg-white shadow shadow-black py-3 pl-9 pr-4'>
          <input type="email" placeholder='User' className='outline-none'/>
          <UserSquare strokeWidth={1.5} className='ml-1' />
        </div>

        <div className='flex flex-row items-center justify-between rounded-[44px] bg-white shadow shadow-black py-3 pl-9 pr-4'>
          <input type="password" placeholder='Password' className='outline-none'/>
          <Lock strokeWidth={1.5} className='ml-1' />
        </div>

        {/* <button type='submit' className='text-white bg-[#E3000F] w-40 h-10 rounded-[20px] hover:bg-[#E3000F]/90 transition-colors duration-300'>Entrar</button> */}
        <Link className='flex items-center justify-center text-white bg-[#E3000F] w-40 h-10 rounded-[20px] hover:bg-[#E3000F]/90 transition-colors duration-300' href={'/panel/alert/create'}>Entrar</Link>
      </div>
    </main>
  )
}
