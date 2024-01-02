import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Image from 'next/image'

import { UserRegistrationForm } from './components/UserRegistrationForm'
import { SelectSchool } from './components/UserRegistrationForm/SelectSchool'

import Logo from '../../assets/logo.svg'

export default function Register() {
  const user = cookies().get('user')?.value

  if (user) {
    redirect('/panel/alert/create')
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-16 p-24">
      <Image src={Logo} alt="Imagem do logotipo da app técnica" />

      <UserRegistrationForm>
        <SelectSchool />
      </UserRegistrationForm>
    </main>
  )
}
