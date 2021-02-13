import { cc } from "../services/contentful";
import ListLayout from '../components/ListLayout';
import { RelatedItems } from '../components/ListItemElements';

export default function Characters({ characters, selected, toggleSelected }) {
  return (
    <ListLayout activePage="characters">
      {characters.map((character, i) => (
        <div key={character.id} id={character.id} className={`px-2 ${i < characters.length - 1 ? "border-b" : ""}`}>
          <div
            onClick={() => { toggleSelected(character.id) }}
            className="cursor-pointer py-4"
          >
            <div className="flex flex-row items-center">
              <div className="w-full font-bold px-4">{character.name}</div>
            </div>
          </div>
          <div className={`flex flex-col pb-4 ${selected === character.id ? "" : "hidden"}`}>
            <RelatedItems
              episodeList={character.episodes}
              guestList={character.guests}
            />
          </div>
        </div>
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