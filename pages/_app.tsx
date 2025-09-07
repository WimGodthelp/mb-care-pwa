import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '@/styles.css'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(() => {
          console.warn('Service worker registration failed')
        })
    }
  }, [])

  return <Component {...pageProps} />
}
