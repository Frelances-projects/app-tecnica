import Image from 'next/image'

import { UserRegistrationForm } from './components/UserRegistrationForm';
import { SelectSchool } from './components/UserRegistrationForm/SelectSchool';

import Logo from '../../assets/logo.svg'

export default function Register() {
  return (
    <main className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center p-24 gap-16">
      <Image src={Logo} alt='Imagem do logotipo da app técnica' />

      <UserRegistrationForm>
        <SelectSchool />
      </UserRegistrationForm>
    </main>
  )
}
