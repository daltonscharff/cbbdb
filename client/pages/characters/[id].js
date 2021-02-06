import Link from 'next/link';
import { cc } from "../../services/contentful"

export default function Character({ character, ...props }) {
  return (
    <div>
      <main>
        <p>ID: {character.id}</p>
        <p>Name: {character.name}</p>
        <p>Guests:
          <ul>
            {character.guests.map(guest => (
              <Link key={guest.id} href={`/guests/${guest.id}`}>
                <li>
                  {guest.name || guest.id}
                </li>
              </Link>
            ))}
          </ul>
        </p>
        <p>Episodes:
          <ul>
            {character.episodes.map(episode => (
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
      character: await cc.getCharacter(context.params.id)
    }
  }
}

export async function getStaticPaths() {
  const paths = (await cc.getCharacters()).map(character => ({
    params: {
      id: character.id
    }
  }))
  return {
    paths,
    fallback: false
  }
}
