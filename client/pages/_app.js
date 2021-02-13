import Head from 'next/head'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import "semantic-ui-css/semantic.min.css";
import "tailwindcss/tailwind.css";


function CBBDb({ Component, pageProps }) {
  const [selected, setSelected] = useState();
  const router = useRouter();

  useEffect(() => {
    const idHash = router.asPath.split(/#([a-z0-9]+)/gi)[1];
    if (idHash) {
      setSelected(idHash)
    }
  }, [router])

  const toggleSelected = (id) => {
    const route = router.pathname;
    if (router.asPath != route) {
      router.push(route, undefined, { shallow: true })
    }
    if (selected === id) {
      setSelected(null);
    } else {
      setSelected(id);
    }
  }

  return <div>
    <Head>
      <title>The Comedy Bang! Bang! Database</title>
      <link rel="icon" href="/favicon.png" />
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
