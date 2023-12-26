import Image from 'next/image'

import { ForgotPasswordForm } from './components/ForgotPasswordForm'

import Logo from '../../assets/logo.svg'

export default function ForgotPassword() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-36 p-24">
      <Image src={Logo} alt="Imagem do logotipo da app técnica" />

      <ForgotPasswordForm />
    </main>
  )
}
