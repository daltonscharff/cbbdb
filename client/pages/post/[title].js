import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>POSTS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to {props.title}
        </h1>

      </main>

    </div>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      title: context.params.title
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { title: "hello-nextjs" } },
      { params: { title: "learn-nextjs" } },
      { params: { title: "deploy-nextjs" } },
    ],
    fallback: false
  }
}
