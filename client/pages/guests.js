import { Segment } from 'semantic-ui-react';
import { cc } from "../services/contentful";
import ListLayout from '../components/ListLayout';
import { RelatedItems } from '../components/ListItemElements';

export default function Guests({ guests, selected, toggleSelected }) {
  return (
    <ListLayout activePage="guests">
      {guests.map(guest => (
        <Segment.Group key={guest.id} id={guest.id}>
          <Segment
            onClick={() => { toggleSelected(guest.id) }}
            className="cursor-pointer"
          >
            <div className="flex flex-row items-center">
              <div className="w-full font-bold px-4">{guest.name}</div>
            </div>
          </Segment>
          <Segment className={`flex flex-col px-3 ${selected === guest.id ? "" : "hidden"}`}>
            <RelatedItems
              episodeList={guest.episodes}
              characterList={guest.characters}
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
      guests: await cc.getGuests()
    }
  }
}