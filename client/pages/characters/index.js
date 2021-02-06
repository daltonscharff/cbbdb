import Link from 'next/link';
import { cc } from "../../services/contentful"

export default function Characters({ characters, ...props }) {
  return (
    <div>
      {characters.map(character => (
        <div key={character.id}>
          <Link href={`/characters/${character.id}`}>
            {character.name}
          </Link>
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps(context) {
  const characters = await cc.getCharacters()
  return {
    props: {
      characters
    }
  }
}