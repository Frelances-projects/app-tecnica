import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { AppProvider } from '@/contexts/AppProvider'
import { SideBar } from '@/components/navigation'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  return (
    <AppProvider>
      <div className='flex flex-col gap-4 md:flex-row'>
        {pathname !== '/' ? (
          <>
            {pathname.startsWith('/info') ||
              pathname.startsWith('/theoretical-classes') ||
              pathname.startsWith('/pratical-classes') && (
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
    </AppProvider>
  )
}
