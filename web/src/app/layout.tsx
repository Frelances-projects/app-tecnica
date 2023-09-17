import { Inter } from 'next/font/google'

import './globals.css'

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
        <div className='mx-auto max-w-[1440px] w-full h-[1px] bg-black'/>
        <div className='flex gap-11'>
          {children}
        </div>
      </body>
    </html>
  )
}
