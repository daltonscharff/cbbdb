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
              <li key={guest.id}>
                {guest.name || guest.id}
              </li>
            ))}
          </ul>
        </p>
        <p>Episodes:
          <ul>
            {character.episodes.map(episode => (
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
  console.log(await cc.getCharacter(context.params.id))
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
