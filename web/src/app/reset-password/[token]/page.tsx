import Image from 'next/image'

import { ResetPasswordForm } from './components/ResetPasswordForm'

import Logo from '../../../assets/logo.svg'

interface ResetPasswordProps {
  params: {
    token: string
  }
}

export default function ResetPassword({ params }: ResetPasswordProps) {
 return (
  <main className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center p-24 gap-36">
    <Image src={Logo} alt='Imagem do logotipo da app técnica' />

    <ResetPasswordForm token={params.token} />
  </main>
 )
}