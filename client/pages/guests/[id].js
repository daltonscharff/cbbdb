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
              <li>
                {character.name || character.id || '???'}
              </li>
            ))}
          </ul>
        </p>
        <p>Episodes:
          <ul>
            {guest.episodes.map(episode => (
              <li>
                {episode.title || episode.id || '???'}
              </li>
            ))}
          </ul>
        </p>
      </main>
    </div>
  )
}

export async function getStaticProps(context) {
  const guest = await cc.getGuest(context.params.id)
  return {
    props: {
      guest
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
