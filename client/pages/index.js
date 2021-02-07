import { useState } from 'react';
import { cc } from "../services/contentful";
import { Segment } from 'semantic-ui-react';
import ListLayout from '../components/layouts/ListLayout';
import { RelatedItems } from '../components/ListItemElements';

export default function Episodes({ episodes }) {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  return (
    <ListLayout activePage="episodes">
      {episodes.map(episode => (
        <Segment.Group key={episode.id} id={episode.id}>
          <Segment
            onClick={() => { selectedEpisode === episode.id ? setSelectedEpisode(null) : setSelectedEpisode(episode.id) }}
            className="cursor-pointer"
          >
            <div className="flex flex-row">
              <div className="text-left">{episode.number}</div>
              <div className="w-full font-bold px-4">{episode.title}</div>
              <div className="w-48 text-right">{episode.releaseDate}</div>
            </div>
          </Segment>
          <Segment className={`flex flex-col px-3 ${selectedEpisode === episode.id ? "" : "hidden"}`}>
            <div className="pb-5 text-sm">{episode.description}</div>
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
