import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

import { AppProvider } from '@/contexts/AppProvider'
import { SideBar } from '@/components/navigation'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  return (
    <AppProvider>
      <div className={`flex flex-col gap-4 md:flex-row ${inter.className}`}>
        {pathname !== '/' ? (
          <>
            {(pathname.startsWith('/info') ||
              pathname.startsWith('/theoretical-classes') ||
              pathname.startsWith('/calendar') ||
              pathname.startsWith('/practical-classes')) && (
                <SideBar />
            )}
          </>
        ): (
          <></>
        )}
        <div className='px-4 w-full'>
          <Component {...pageProps} />
        </div>
      </div>
      <Toaster />
    </AppProvider>
  )
}
