import Link from 'next/link';
import { cc } from "../services/contentful"

export default function Episodes({ episodes, ...props }) {
  console.log(episodes.map(ep => ep.guests))

  return (
    <div>
      {episodes.map(episode => (
        <div key={episode.id}>
          <p>ID: {episode.id}</p>
          <p>Title: {episode.title}</p>
          <p>Characters:
          <ul>
              {episode.characters.map(character => (
                <Link key={character.id} href={`/characters/${character.id}`}>
                  <li>
                    {character.name || character.id}
                  </li>
                </Link>
              ))}
            </ul>
          </p>
          <p>Guests:
          <ul>
              {episode.guests.map(guest => (
                <Link key={guest.id} href={`/guests/${guest.id}`}>
                  <li>
                    {guest.name || guest.id}
                  </li>
                </Link>
              ))}
            </ul>
          </p>
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      episodes: await cc.getEpisodes()
    }
  }
}
