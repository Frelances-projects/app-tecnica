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
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-36 p-24">
      <Image src={Logo} alt="Imagem do logotipo da app técnica" />

      <ResetPasswordForm token={params.token} />
    </main>
  )
}
