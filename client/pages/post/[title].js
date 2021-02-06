export default function Home(props) {
  return (
    <div>
      <main>
        <h1>
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
