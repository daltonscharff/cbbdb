import Link from 'next/link';
import { cc } from "../../services/contentful";
import ListLayout from '../../components/layouts/ListLayout';

export default function Characters({ characters }) {
  return (
    <ListLayout activePage="characters">
      {characters.map(character => (
        <div key={character.id}>
          <Link href={`/characters/${character.id}`}>
            {character.name}
          </Link>
        </div>
      ))}
    </ListLayout>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      characters: await cc.getCharacters()
    }
  }
}