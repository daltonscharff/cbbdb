import Head from 'next/head'

function CBBDb({ Component, pageProps }) {
  return <div>
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"></link>
    </Head>
    <Component {...pageProps} />
  </div >
}

export default CBBDb
