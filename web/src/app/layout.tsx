import { useRouter } from 'next/router'
import { Header } from './components/Header'
import { SideBar } from './components/Navigation'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'App Técnica',
  description: 'Escola de condução',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-PT">
      <body className={inter.className}>
          <Header />
        <div className='mx-auto max-w-[1440px] w-full h-[1px] bg-black'/>
        <div className='flex gap-11'>
          <SideBar />
          <div className="w-full max-w-7xl flex">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
