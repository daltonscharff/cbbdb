import Link from 'next/link';
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
              <Link key={character.id} href={`/characters/${character.id}`}>
                <li>
                  {character.name || character.id}
                </li>
              </Link>
            ))}
          </ul>
        </p>
        <p>Episodes:
          <ul>
            {guest.episodes.map(episode => (
              <Link key={episode.id} href={`/#${episode.id}`}>
                <li>
                  {episode.title || episode.id}
                </li>
              </Link>
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
