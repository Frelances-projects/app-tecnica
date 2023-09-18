import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Inter } from 'next/font/google'

import { Toaster } from "@/components/ui/toaster"

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
  const headersList = headers();
  const activePath = headersList.get("x-invoke-path");

  const user = cookies().get('user')?.value

  if (user && (activePath === '/' || activePath === '/login')) {
    redirect('/panel/alert/create')
  }

  return (
    <html lang="pt-PT">
      <body className={inter.className}>
        <div className='mx-auto max-w-[1440px] w-full h-[1px] bg-black'/>
        <div className='flex gap-11'>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}
