import { Header } from './components/Header'
import { Navigation } from './components/Navigation'

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

      <Navigation />

      <div className='mx-auto max-w-[1440px] w-full h-[1px] bg-black'/>

      <div className=" w-full h-full flex items-center justify-center">
        {children}
      </div>
    </>
  )
}
