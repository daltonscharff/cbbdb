import Head from 'next/head'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


function CBBDb({ Component, pageProps }) {
  const [selected, setSelected] = useState();
  const router = useRouter();

  useEffect(() => {
    const idHash = router.asPath.split(/#([a-z0-9]+)/gi)[1] || null;
    console.log({ idHash })
    setSelected(idHash)
  }, [router])

  const toggleSelected = (id) => {
    selected === id ? setSelected(null) : setSelected(id)
  }

  return <div>
    <Head>
      <title>The Comedy Bang! Bang! Database</title>
      <link rel="icon" href="/favicon.png" />
      <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"></link>
    </Head>
    <Component
      selected={selected}
      toggleSelected={toggleSelected}
      router={router}
      {...pageProps}
    />
  </div >
}

export default CBBDb
