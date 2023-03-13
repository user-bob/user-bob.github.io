import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import FirebaseProvider from "@/context/authContext";

export default function App({ Component, pageProps }: AppProps) {
  return <FirebaseProvider><Component {...pageProps} /></FirebaseProvider>
}
