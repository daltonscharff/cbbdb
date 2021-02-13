import { cc } from "../services/contentful";
import ListLayout from '../components/ListLayout';
import { RelatedItems } from '../components/ListItemElements';

export default function Guests({ guests, selected, toggleSelected }) {
  return (
    <ListLayout activePage="guests">
      {guests.map((guest, i) => (
        <div key={guest.id} id={guest.id} className={`px-2 ${i < guests.length - 1 ? "border-b" : ""}`}>
          <div
            onClick={() => { toggleSelected(guest.id) }}
            className="cursor-pointer py-4"
          >
            <div className="flex flex-row items-center">
              <div className="w-full font-bold px-4">{guest.name}</div>
            </div>
          </div>
          <div className={`flex flex-col pb-4 ${selected === guest.id ? "" : "hidden"}`}>
            <RelatedItems
              episodeList={guest.episodes}
              characterList={guest.characters}
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
      guests: await cc.getGuests()
    }
  }
}