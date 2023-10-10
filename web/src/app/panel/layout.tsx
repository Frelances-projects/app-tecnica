import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Header } from '../components/Header'
import { SideBar } from '../components/Navigation'

export const metadata = {
  title: 'App Técnica',
  description: 'Painel administrativo',
}

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = cookies().get('user')?.value

  if (!user) {
    redirect('/')
  }

  const formattedUserData = JSON.parse(user)

  return (
    <div className='overflow-x-hidden'>
      <Header username={formattedUserData.name} />

      <div className='mx-auto max-w-[1440px] w-full h-[1px] bg-black'/>
      <div className='flex gap-11'>
        <SideBar />
        <div className="w-full max-w-6xl flex justify-center">
          {children}
        </div>
      </div>
    </div>
  )
}
