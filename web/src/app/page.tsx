import Image from 'next/image'

import { LoginUserForm } from './components/LoginUserForm'

import Logo from '../assets/logo.svg'

export default function Login() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-36 p-24">
      <Image src={Logo} alt="Imagem do logotipo da app técnica" />

      <LoginUserForm />
    </main>
  )
}
