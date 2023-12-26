import Image from 'next/image'

import { UserRegistrationForm } from './components/UserRegistrationForm'
import { SelectSchool } from './components/UserRegistrationForm/SelectSchool'

import Logo from '../../assets/logo.svg'

export default function Register() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-16 p-24">
      <Image src={Logo} alt="Imagem do logotipo da app técnica" />

      <UserRegistrationForm>
        <SelectSchool />
      </UserRegistrationForm>
    </main>
  )
}
