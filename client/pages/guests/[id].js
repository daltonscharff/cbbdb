import { cc } from "../../services/contentful"

export default function Guest({ guest, ...props }) {
  return (
    <div>
      <main>
        <p>ID: {guest.id}</p>
        <p>Name: {guest.name}</p>
        <p>Characters:
          <ul>
            {guest.characters.map(character => (
              <li key={character.id}>
                {character.name || character.id}
              </li>
            ))}
          </ul>
        </p>
        <p>Episodes:
          <ul>
            {guest.episodes.map(episode => (
              <li key={episode.id}>
                {episode.title || episode.id}
              </li>
            ))}
          </ul>
        </p>
      </main>
    </div>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      guest: await cc.getGuest(context.params.id)
    }
  }
}

export async function getStaticPaths() {
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
