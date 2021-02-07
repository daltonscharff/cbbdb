import { useState } from 'react';
import { cc } from "../../services/contentful";
import { Segment } from 'semantic-ui-react';
import ListLayout from '../../components/ListLayout';
import { RelatedItems } from '../../components/ListItemElements';

export default function Guests({ guests }) {
  const [selected, setSelected] = useState(null);

  return (
    <ListLayout activePage="guests">
      {guests.map(guest => (
        <Segment.Group key={guest.id} id={guest.id}>
          <Segment
            onClick={() => { selected === guest.id ? setSelected(null) : setSelected(guest.id) }}
            className="cursor-pointer"
          >
            <div className="flex flex-row">
              <div className="w-full font-bold px-4">{guest.name}</div>
            </div>
          </Segment>
          <Segment className={`flex flex-col px-3 ${selected === guest.id ? "" : "hidden"}`}>
            <div className="pb-5 text-sm">{guest.description}</div>
            <RelatedItems
              guestList={guest.guests}
              characterList={guest.characters}
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
      guests: await cc.getGuests()
    }
  }
}