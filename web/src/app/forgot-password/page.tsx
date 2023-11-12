import Image from 'next/image'

import { ForgotPasswordForm } from './components/ForgotPasswordForm'

import Logo from '../../assets/logo.svg'

export default function ForgotPassword() {
  return (
    <main className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center p-24 gap-36">
      <Image src={Logo} alt='Imagem do logotipo da app técnica' />

      <ForgotPasswordForm />
    </main>
  )
}
