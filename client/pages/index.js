import Link from 'next/link';
import { useState } from 'react';
import { cc } from "../services/contentful";
import { Segment, Grid, List, Menu } from 'semantic-ui-react';
import ListLayout from '../components/layouts/ListLayout';

export default function Episodes({ episodes, ...props }) {
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  return (
    <ListLayout activePage="episodes">
      {episodes.map(episode => (
        <Segment.Group key={episode.id} id={episode.id}>
          <Segment className="cursor-pointer" onClick={() => selectedEpisode === episode.id ? setSelectedEpisode(null) : setSelectedEpisode(episode.id)}>
            <div className="flex flex-row">
              <div className="text-left">{episode.number}</div>
              <div className="w-full font-bold px-4">{episode.title}</div>
              <div className="w-48 text-right">{episode.releaseDate}</div>
            </div>
          </Segment>
          <Segment className={`flex flex-col px-3 ${selectedEpisode === episode.id ? "" : "hidden"}`}>
            <div className="pb-5 text-sm">{episode.description}</div>
            <Grid columns={2} divided className="text-center">
              <Grid.Row>
                <Grid.Column>
                  <List>
                    <List.Item className="font-bold">Guests</List.Item>
                    {episode.guests.map(guest => (
                      <Link key={guest.id} href={`/guests/${guest.id}`}>
                        <List.Item as='a'>{guest.name}</List.Item>
                      </Link>
                    ))}
                  </List>
                </Grid.Column>
                <Grid.Column>
                  <List>
                    <List.Item className="font-bold">Characters</List.Item>
                    {episode.characters.map(character => (
                      <Link key={character.id} href={`/guests/${character.id}`}>
                        <List.Item as='a'>{character.name}</List.Item>
                      </Link>
                    ))}
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
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
