import { Html, Head, Main, NextScript } from 'next/document'

import { Toaster } from "@/components/ui/toaster"

export default function Document() {
  return (
    <Html lang="pt-PT">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Toaster />
      </body>
    </Html>
  )
}
