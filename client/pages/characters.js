import { useState } from 'react';
import { cc } from "../services/contentful";
import { Segment } from 'semantic-ui-react';
import ListLayout from '../components/ListLayout';
import { RelatedItems } from '../components/ListItemElements';

export default function Characters({ characters }) {
  const [selected, setSelected] = useState(null);

  return (
    <ListLayout activePage="characters">
      {characters.map(character => (
        <Segment.Group key={character.id} id={character.id}>
          <Segment
            onClick={() => { selected === character.id ? setSelected(null) : setSelected(character.id) }}
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

export async function getStaticProps(context) {
  return {
    props: {
      characters: await cc.getCharacters()
    }
  }
}