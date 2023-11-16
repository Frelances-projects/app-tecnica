import '@/styles/globals.css'
import { useEffect } from 'react';
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { getMessaging, onMessage } from 'firebase/messaging';

import { AppProvider } from '@/contexts/AppProvider'
import { firebaseApp } from '@/lib/firebase'

import { SideBar } from '@/components/navigation'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from '@/components/ui/use-toast';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        toast({
          title: payload.notification?.title,
          description: payload.notification?.body
        })
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  return (
    <AppProvider>
      <div className={`flex flex-col gap-4 md:flex-row ${inter.className}`}>
        {pathname !== '/' ? (
          <>
            {(pathname.startsWith('/info') ||
              pathname.startsWith('/theoretical-classes') ||
              pathname.startsWith('/calendar') ||
              pathname.startsWith('/practical-classes') || 
              pathname.startsWith('/menu')) && (
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
