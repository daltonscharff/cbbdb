import { useState } from 'react';
import dayjs from 'dayjs';
import { cc } from "../services/contentful";
import { Segment } from 'semantic-ui-react';
import ListLayout from '../components/ListLayout';
import { RelatedItems } from '../components/ListItemElements';

export default function Episodes({ episodes }) {
  const [selected, setSelected] = useState(null);

  return (
    <ListLayout activePage="episodes">
      {episodes.map(episode => (
        <Segment.Group key={episode.id} id={episode.id}>
          <Segment
            onClick={() => { selected === episode.id ? setSelected(null) : setSelected(episode.id) }}
            className="cursor-pointer"
          >
            <div className="flex flex-row items-center">
              <div className="text-left">{episode.number}</div>
              <div className="w-full font-bold px-4">{episode.title}</div>
              <div className="w-48 text-right">{dayjs(episode.releaseDate).format("MMMM D, YYYY")}</div>
            </div>
          </Segment>
          <Segment className={`flex flex-col px-3 ${selected === episode.id ? "" : "hidden"}`}>
            <div className="pb-5">{episode.description}</div>
            <RelatedItems
              guestList={episode.guests}
              characterList={episode.characters}
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
      episodes: await cc.getEpisodes()
    }
  }
}
