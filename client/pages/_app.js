import '../styles/globals.css'
import Head from 'next/head'

function CBBDb({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" type="text/css" href="semantic/dist/semantic.min.css" />
      <script
        src="https://code.jquery.com/jquery-3.1.1.min.js"
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
        crossorigin="anonymous"></script>
      <script src="semantic/dist/semantic.min.js"></script>
    </Head>
    <Component {...pageProps} />
  </>
}

export default CBBDb
