import Image from "next/image";
import { useRouter } from "next/navigation";

import { SubmitButton } from "@/components/buttons/SubmitButton";
import { Input } from "@/components/Input";

import { EnvelopeSimple } from "@phosphor-icons/react";

import logo from '../../assets/tecnica_LOGO.jpg'

export default function ForgotPassword() {
  const router = useRouter()
  return (
    <div className="flex h-screen pb-16 flex-col items-center justify-center">
      <Image src={logo} alt='Logo' width={295} height={295} className='mx-auto mb-32'/>

      <div className="flex flex-col w-full items-center justify-center gap-9 px-8">
        <div className="w-full">
          <Input
            Icon={<EnvelopeSimple size={24} weight="fill" color={'#000000'} />}
            placeholder="Email"
          />
        </div>

        <SubmitButton
          onClick={() => router.push('/')}
          title="Submeter"
        />
      </div>
    </div>
  )
}