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
  return (
    <>
      <Header />


      <div className='mx-auto max-w-[1440px] w-full h-[1px] bg-black'/>
      <div className='flex gap-11'>
        <SideBar />
        <div className="w-full max-w-6xl flex items-center justify-center">
          {children}
        </div>
      </div>
    </>
  )
}
