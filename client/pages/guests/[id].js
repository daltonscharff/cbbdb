import ContentfulClient from "../../services/contentful"

export default function Guest(props) {
  return (
    <div>
      <main>
        <h1>
          ID: {props.id}
        </h1>
      </main>
    </div>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      id: context.params.id
    }
  }
}

export async function getStaticPaths() {
  let cc = new ContentfulClient();
  cc.getGuests().then(a => {
    console.log(a);
  })
  const paths = (await cc.getGuests()).map(guest => ({
    params: {
      id: guest.id
    }
  }))
  return {
    paths,
    fallback: false
  }
}
