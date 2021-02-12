import { Segment } from 'semantic-ui-react';
import { cc } from "../services/contentful";
import ListLayout from '../components/ListLayout';
import { RelatedItems } from '../components/ListItemElements';

export default function Characters({ characters, selected, toggleSelected }) {
  return (
    <ListLayout activePage="characters">
      {characters.map(character => (
        <Segment.Group key={character.id} id={character.id}>
          <Segment
            onClick={() => { toggleSelected(character.id) }}
            className="cursor-pointer"
          >
            <div className="flex flex-row items-center">
              <div className="w-full font-bold px-4">{character.name}</div>
            </div>
          </Segment>
          <Segment className={`flex flex-col px-3 ${selected === character.id ? "" : "hidden"}`}>
            <RelatedItems
              episodeList={character.episodes}
              guestList={character.guests}
            />
          </Segment>
        </Segment.Group>
      ))}
    </ListLayout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      characters: await cc.getCharacters()
    }
  }
}