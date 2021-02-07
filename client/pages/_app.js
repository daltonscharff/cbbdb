import "tailwindcss/tailwind.css"
import 'semantic-ui-css/semantic.min.css'
import Head from 'next/head'

function CBBDb({ Component, pageProps }) {
  return <div>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Component {...pageProps} />
  </div >
}

export default CBBDb
