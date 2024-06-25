import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Header } from '../components/Header'
import { SideBar } from '../components/Navigation'

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
    <div className="w-full">
      <Header user={formattedUserData} />

      <div className="h-[1px] w-full bg-black" />
      <div className="flex gap-4 xl:gap-11">
        <div className="hidden lg:flex">
          <SideBar
            hasMobile={false}
            userFunction={formattedUserData.function}
          />
        </div>
        <div className="flex w-full justify-center">{children}</div>
      </div>
    </div>
  )
}
