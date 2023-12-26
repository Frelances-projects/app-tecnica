import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Header } from '../components/Header'
import { SideBar } from '../components/Navigation'

import { ReactQueryProvider } from '@/contexts/ReactQueryProvider'

import { User } from '@/utils/interfaces/user'

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

  const formattedUserData = JSON.parse(user) as User

  return (
    <div className="overflow-x-hidden">
      <Header username={formattedUserData.name} />

      <ReactQueryProvider>
        <div className="mx-auto h-[1px] w-full max-w-[1440px] bg-black" />
        <div className="flex gap-11">
          <SideBar userFunction={formattedUserData.function} />
          <div className="flex w-full max-w-6xl justify-center">{children}</div>
        </div>
      </ReactQueryProvider>
    </div>
  )
}
