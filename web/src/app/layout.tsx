import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'App Técnica',
  description: 'Escola de condução',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-PT">
      <body className={inter.className}>
        <div className="mx-auto h-[1px] w-full max-w-[1440px] bg-black" />
        <div className="flex gap-11">{children}</div>
        <Toaster />
      </body>
    </html>
  )
}
