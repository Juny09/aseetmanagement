import '../styles/globals.css'
import '../styles/homep.css'
import '../styles/form.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
